var express = require('express');
var router = express.Router();
let NewsModel = require('../models/news');

// Obtener todas las noticias
router.get("/", async function (req, res, next) {
  const resultado = await NewsModel.find();
  res.json(resultado);
  console.log(resultado);
});

// Crear una nueva noticia
router.post("/", async function (req, res, next) {
  // Verificar que se hayan enviado todos los campos requeridos
  if (!req.body.title || !req.body.content || !req.body.date || !req.body.images) {
    res.status(400).json({ error: 'Faltan campos requeridos' });
    return;
  }

  const news = new NewsModel({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    images: req.body.images // Por defecto, el campo de imágenes será un arreglo vacío si no se especifica en la solicitud
  });

  try {
    const result = await news.save(); // Guardar la noticia en la base de datos
    res.json('Registro de la noticia exitosamente');
    console.log(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la noticia en la base de datos' });
    console.error(error);
  }
});

// Actualizar una noticia por ID
router.put("/:_id", async function (req, res, next) {
  const filter = {_id: req.params._id};
  const update = {
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    images: req.body.images || [] // Por defecto, el campo de imágenes será un arreglo vacío si no se especifica en la solicitud
  };

  const resultado = await NewsModel.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true
  });

  res.json(resultado);
  console.log(resultado);
});

// Eliminar una noticia por ID
router.delete("/:_id", async function (req, res, next) {
  try {
    const result = await NewsModel.deleteOne({_id: req.params._id});
    if (result.deletedCount === 1) {
      res.json('Noticia eliminada exitosamente');
    } else {
      res.status(404).json({ error: 'No se encontró la noticia' });
    }
    console.log(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la noticia' });
    console.error(error);
  }
});

module.exports = router;