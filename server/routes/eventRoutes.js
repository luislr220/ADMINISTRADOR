const express = require('express');
const Event = require('../models/event');

const router = express.Router();

// Obtener todas las noticias
router.get('/', async (req, res) => {
  try {
    const event = await Event.find({});
    res.send(event);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Obtener una noticia por ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.send(event);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Crear una nueva noticia
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.send(news);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Actualizar una noticia por ID
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(news);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Eliminar una noticia por ID
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.send('Noticia eliminada');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
