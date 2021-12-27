const express = require("express");
const router = express.Router();

router.put("/modificarnombre", function (req, res) {
  req.app.locals.db.collection("usuarios").updateOne(
    { nombre: req.body.nombre },
    {
      $set: {
        nombre: req.body.nombre,
      },
    },
    (err, data) => {
      if (err) {
        res.send({
          error: true,
          data: err,
          mensaje: "No se ha podido acceder a la base de datos",
        });
      } else {
        res.send({
          error: false,
          data: data,
          mensaje: "Nombre actualizado",
        });
        console.log(req.body.nombre); //Si que recoge el nombre que se pone en el input
      }
    }
  );
});

router.put("/modificaremail", function (req, res) {
  req.app.locals.db.collection("usuarios").updateOne(
    { email: req.body.email },
    {
      $set: {
        email: req.body.emailNew,
      },
    },
    (err, data) => {
      //Si hay un error de Mongo
      if (err) {
        res.send({
          error: true,
          data: err,
          mensaje: "No se ha podido acceder a la base de datos",
        });
      } else {
        res.send({
          error: false,
          data: data,
          mensaje: "Email actualizado",
        });
      }
    }
  );
});

router.put("/modificarcontraseña", function (req, res) {
  req.app.locals.db.collection("usuarios").updateOne(
    { password: req.body.password },
    {
      $set: {
        password: req.body.contraseñaNew,
      },
    },
    (err, data) => {
      if (err) {
        res.send({
          error: true,
          data: err,
          mensaje: "No se ha podido acceder a la base de datos",
        });
      } else {
        // Si la contraseña introducida es correcta
        if (data.modifiedCount > 0) {
          res.send({
            error: false,
            data: data,
            mensaje: "Contraseña actualizada",
          });
        }
        // Si el email no esta en la base de datos
        else {
          res.send({
            error: true,
            data: data,
            mensaje: "La contraseña no es correcta",
          });
        }
      }
    }
  );
});

module.exports = router;
