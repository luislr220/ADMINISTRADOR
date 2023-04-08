const express = require('express');
const CarouselAbout = require('../models/carouselAbout');

const router = express.Router();

// Obtener todas los eventos
router.get('/', async (req, res) => {
  try {
    const carouselAbout = await CarouselAbout.find({});
    res.send(carouselAbout);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Obtener un evento por ID
router.get('/:id', async (req, res) => {
  try {
    const carouselAbout = await CarouselAbout.findById(req.params.id);
    res.send(carouselAbout);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Crear una nuevo evento
router.post('/', async (req, res) => {
  try {
    const carouselAbout = new CarouselAbout(req.body);
    await carouselAbout.save();
    res.send(carouselAbout);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Actualizar un evento por ID
router.put('/:id', async (req, res) => {
  try {
    const carouselAbout = await CarouselAbout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(carouselAbout);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Eliminar una evento por ID
router.delete('/:id', async (req, res) => {
  try {
    await CarouselAbout.findByIdAndDelete(req.params.id);
    res.send('evento eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
