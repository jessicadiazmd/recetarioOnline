const express = require("express"); //declaramos express para poder utilizarlo
const session = require("express-session");
const app = express(); // guardamos express en const app
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const secreto = "recetario";
const puerto = process.env.PORT || 3001;
const crypto = require("crypto"); //función de node para encriptar

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const MongoStore = require("connect-mongo"); //Instalamos connect-mongo para guardar sesiones en mongo, en vez de en el servidor local
//MongoClient es un cliente para las comunicaciones con la base de datos y MongoStore otro cliente paralelo que va a usar express para guardar las sesiones

let feedback = {
  //Provee de feedback específico sobre el fallo en la autentificación
  middle: false,
  provider: false, // true = específico (cuando estamos con el desarrollo de la web), false = genérico (si la web ya esta en funcionamiento, por "seguridad" de datos)
  mensaje: "",
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", //3000 es el del front
    credentials: true,
  })
);

//Configuracion de MongoStore
app.use(
  session({
    secret: secreto, //Secreto de la sesion (se puede hacer dinámico), //el secreto esta definido en la línea 6
    resave: false, //Evita el reseteo de la sesión con cada llamada
    saveUninitialized: false, //Evita crear sesiones vacías
    store: MongoStore.create({
      //Nos guarda las sesiones en la colección "sesiones" en la base de datos "prueba"
      mongoUrl:
        "mongodb+srv://jessica:jessicaMongo@cluster0.zy09y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      dbName: "CookLover",
      collectionName: "sesiones",
      ttl: 1000 * 60 * 60 * 24, //Time To Live de las sesiones, su duración, cuánto tiempo es valida (1 segundo*60*60*24 = 24 horas)
      autoRemove: "native", //Utiliza el registro TTL de Mongo para ir borrando las sesiones caducadas.
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //Caducidad de la cookie en el navegador del cliente.
    },
  })
);

app.use(cookieParser(secreto));
app.use(passport.initialize()); //le dice a express que para la autentificación utilice passport
app.use(passport.session()); //le dice a express que las sesiones las va a gestionar passport (si no pusiesemos esto las gestionaría express)

//sirve en el modo desarrollo para ver los datos de las llamadas, para ver si se crea una sesión... Pero cuando pongamos la línea 18 de código en false ya no nos sirve porque enseñaría datos privados del usuario. (esto nos ahorra ir metiendo varios console log con el req.email, req. password...)
if (feedback.middle) {
  app.use((req, res, next) => {
    console.log("Express Middleware");
    console.log(req.session ? req.session : "No hay sesion");
    console.log(req.user ? req.user : "No hay usuario");
    next();
  });
}

//Control de errores de Mongo
MongoClient.connect(
  "mongodb+srv://jessica:jessicaMongo@cluster0.zy09y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  (err, client) => {
    err
      ? (console.log("🔴 MongoDB no conectado"), console.log(`error: ${err}`))
      : ((app.locals.db = client.db("CookLover")),
        console.log("MongoDB está conectado"));
  }
);

//Configuración de como Passport va a comprobar los usuarios
passport.use(
  //al configurar el LocalStrategy lo primero que acepta es un objeto (la configuración)
  new LocalStrategy(
    {
      //los campos "email" y "password" son los que va a buscar en nuestra bbdd
      usernameField: "email", //puede ser email, DNI, número de teléfono... PERO QUE SEA ÚNICO
      passwordField: "password",
    },
    //esta función hace la llamada a la bbdd para extrarer al usuario (configura como es la llamada a la bbdd para recuperar los usuarios y ver si el password es correcto)
    function (email, password, done) {
      console.log(password);
      feedback.mensaje = ""; //para dar feedback
      app.locals.db
        //se conecta a la base de datos, a la collección usuarios
        .collection("usuarios")
        //el criterio de búsqueda de .findOne es email porque el un identificador único
        .findOne({ email: email }, function (err, user) {
          console.log(email);
          //user es la respuesta de la bbdd
          if (err) {
            return done(err);
          }
          if (!user) {
            feedback.provider
              ? (feedback.mensaje = "Usuario no registrado") //linea 20 , true - en desarrollo
              : (feedback.mensaje =
                  "Ups! El email y/o contraseña no están bien"); //linea 20 , false - en funcinamiento
            return done(null, false);
          }
          if (!validoPass(password, user.password.hash, user.password.salt)) {
            //password !== user.password
            feedback.provider
              ? (feedback.mensaje = "Password incorrecto") //linea 20 , true - en desarrollo
              : (feedback.mensaje =
                  "Ups! El email y/o contraseña no están bien"); //linea 20 , false - en funcinamiento
            return done(null, false);
          }
          feedback.mensaje = `Hola ${user.nombre}`; //"Login correcto"
          return done(null, user); //si el email y contraseña son correctos devuelve la info de users
        });
    }
  )
);

//recibe el usuario si el login ha sido correcto
passport.serializeUser(function (user, done) {
  console.log("-> Serialize");
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("-> Deserialize");
  app.locals.db
    .collection("usuarios")
    .findOne({ email: user.email }, function (err, usuario) {
      if (err) {
        return done(err);
      }
      if (!usuario) {
        return done(null, null);
      }
      return done(null, usuario);
    });
});

//--------------- login - logout -------------------

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api", //redirección si va bien
    failureRedirect: "/api/fail", //redirección si va mal
  })
);

app.all("/api", (req, res) => {
  //.all incluye .get .post ...
  res.send({
    logged: true,
    mensaje: feedback.mensaje,
    user: req.user,
  });
});

app.all("/api/fail", (req, res) => {
  res.send({
    logged: false,
    mensaje: feedback.mensaje,
  });
});

app.post("/logout", (req, res) => {
  req.logOut(),
    res.send({
      logged: false,
      mensaje: "Logout correcto",
    });
});

//--------------- registrarse -------------------

app.post("/signup", (req, res) => {
  console.log(req.body);
  req.app.locals.db
    .collection("usuarios")
    .find({ email: req.body.email })
    .toArray((err, users) => {
      if (err) {
        res.send({ error: true, contenido: err });
      } else {
        //si ese email ya esta registrado
        if (users.length > 0) {
          res.send({
            registrado: false,
            error: true,
            mensaje: "Este email ya está registrado",
          });
        } else {
          if (req.body.password !== req.body.password2) {
            res.send({
              registrado: false,
              error: true,
              mensaje: "Las contraseñas no coinciden",
            });
          } else {
            //si ese email no esta registrado
            let passwordCrypt = creaPass(req.body.password);
            req.app.locals.db.collection("usuarios").insertOne(
              {
                nombre: req.body.nombre,
                email: req.body.email,
                password: {
                  hash: passwordCrypt.hash,
                  salt: passwordCrypt.salt,
                },
              },
              (err1, data) => {
                err1
                  ? res.send({ error: true, contenido: err1 })
                  : (console.info({
                      error: false,
                      contenido: data,
                    }),
                    res.send({
                      error: false,
                      mensaje: `Usuario registrado  ¡Bienvenido/a ${req.body.nombre}!` /* contenido: data */,
                    }));
              }
            );
          }
        }
      }
    });
});

app.get("/perfil", (req, res) => {
  req.isAuthenticated()
    ? res.send({
        logged: true,
        mensaje: "Todo correcto: Esto es información confidencial",
        user: req.user,
      })
    : res.send({
        looged: false,
        mensaje: "Necesitas loguearte",
      });
});

/* app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
}); */

//importar router
let recetas = require("./recetas");
app.use("/recetas", recetas);

let usuarios = require("./usuarios");
app.use("/usuarios", usuarios);

/* let cuenta = require("./cuenta");
app.use("/cuenta", cuenta); */

app.listen(puerto, (err) => {
  err
    ? console.error("🔴 Servidor fallido")
    : console.log("Servido a la escucha en el puerto: " + puerto);
});

//función para encriptar la contraseña
function creaPass(password) {
  let salt = crypto.randomBytes(32).toString("hex"); //numero aleatorio con el que se va a codificar el hash
  let genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return {
    salt: salt,
    hash: genHash,
  };
}

//comprueba que el password encriptado funciona
function validoPass(password, hash, salt) {
  let hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hashVerify === hash;
}
