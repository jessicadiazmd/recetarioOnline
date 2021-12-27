const express = require("express");
const router = express.Router();

//Ruta /recetas/todas ofrece un listado de TODAS las recetas
router.get("/todas", (req, res) => {
  req.app.locals.db
    .collection("Recetas")
    .find()
    .toArray((err, data) => {
      err
        ? (console.log(err),
          res.send({ mensaje: "No se ha podido acceder a la base de datos" }))
        : (console.log(data), res.send({ results: data }));
    });
});

router.get("/busqueda", (req, res) => {
  req.app.locals.db
    .collection("Recetas")
    .find({ ingredientes: /req.body.busqueda/ })
    .toArray((err, data) => {
      err
        ? (console.log(err),
          res.send({ mensaje: "No se ha podido acceder a la base de datos" }))
        : (console.log(data), res.send({ results: data }));
    });
});

router.get("/:categoria", (req, res) => {
  req.app.locals.db
    .collection("Recetas")
    .find({ categoria: req.params.categoria })
    .toArray((err, data) => {
      err
        ? (console.log(err),
          res.send({ mensaje: "No se ha podido acceder a la base de datos" }))
        : res.send({ results: data });
    });
});

router.get("/:categoria/:nombre", (req, res) => {
  console.log(req.params);
  req.app.locals.db
    .collection("Recetas")
    .find({
      $and: [
        { categoria: req.params.categoria },
        { nombre: req.params.nombre },
      ],
    })
    .toArray((err, data) => {
      err
        ? (console.log(err),
          res.send({ mensaje: "No se ha podido acceder a la base de datos" }))
        : res.send({ results: data });
    });
});

module.exports = router;
