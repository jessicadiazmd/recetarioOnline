const express = require("express"); //llamamos a express
const bcrypt = require("bcrypt");
const router = express.Router(); //declaramos la constante router, con la que operaremos en las páginas. más abajo la exportamos a la página principal con el module.exports
router.use(express.urlencoded({ extended: false })); //recoger archivos encoded del body
router.use(express.json()); //recoger archivos de tipo put
router.use(express.static("public")); //ir a los archivos estáticos

//REGISTRO DEL CLIENTE

router.post("/registro", (req, res) => {
  let contraseniaCifrada = bcrypt.hashSync(req.body.password, 10);
  let coincidencia = bcrypt.compareSync(req.body.password, contraseniaCifrada);

  req.app.locals.db
    .collection("Usuarios")
    .find({ email: req.body.email })
    .toArray((err, data) => {
      //Si hay un error de Mongo
      if (err) {
        res.send({
          error: true,
          data: data,
          mensaje: `<p>No se ha podido acceder a la base de datos</p>`,
        });
      }
      //Si no hay un error de Mongo
      else {
        //Si ya existe un usuario con ese correo
        if (data.length > 0) {
          res.send({
            error: true,
            data: data,
            mensaje: `<p>El usuario ${req.body.email} ya existe</p>`,
          });
        } //cierra if
        //Si no existe un usuario con ese correo y puede seguir con el registro
        else {
          if (coincidencia) {
            req.app.locals.db.collection("usuarios").insertOne(
              {
                nombre: req.body.nombre,
                password: contraseniaCifrada,
                email: req.body.email,
              },
              (err1, data1) => {
                err1
                  ? //Si hay un error de Mongo
                    res.send({
                      altaOk: false,
                      data: data1,
                      mensaje: `<p>Ha habido un error, el usuario no se ha podido crear</p>`,
                    })
                  : //Aviso si todo ha ido bien
                    res.send({
                      altaOk: true,
                      data: data1,
                      mensaje: `<p>¡Registrado!</p>`,
                    });
              }
            ); //cierre de insert One
          }
        } //cierra else de el email no esta cogido
      } //cierra else de si se puede acceder a la BBDD
    }); //cierra el .toArray
}); //cierra el router.post

module.exports = router;
