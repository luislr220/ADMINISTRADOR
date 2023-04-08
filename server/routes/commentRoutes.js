var express = require('express');
var router = express.Router();
let commentModel = require('../models/comment');

// Obtener todos los comentarios
router.get("/", async function (req, res, next) {
  const resultado = await commentModel.find();
  res.json(resultado);
  console.log(resultado);
});

// Crear un nuevo comentario
router.post("/", async function (req, res, next) {
  const comment = new commentModel({
    comment: req.body.comment
  });

  try {
    const result = await comment.save(); // Guardar el comentario en la base de datos
    res.json('Registro del comentario exitosamente');
    console.log(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el comentario en la base de datos' });
    console.error(error);
  }
});

// Actualizar un comentario por ID
router.put("/:_id", async function (req, res, next) {
  const filter = {_id: req.params._id};
  const update = {
    comment: req.body.comment
  };

  const resultado = await commentModel.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true
  });

  res.json(resultado);
  console.log(resultado);
});

// Eliminar un comentario por ID
router.delete("/:_id", async function (req, res, next) {
  try {
    const result = await commentModel.deleteOne({_id: req.params._id});
    if (result.deletedCount === 1) {
      res.json('Comentario eliminado exitosamente');
    } else {
      res.status(404).json({ error: 'No se encontró el comentario' });
    }
    console.log(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el comentario' });
    console.error(error);
  }
});

module.exports = router;