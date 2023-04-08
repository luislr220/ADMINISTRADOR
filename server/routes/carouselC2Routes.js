const express = require('express');
const CarouselC2 = require('../models/carouselC2');

const router = express.Router();

// Obtener todas los eventos
router.get('/', async (req, res) => {
  try {
    const carouselC2 = await CarouselC2.find({});
    res.send(carouselC2);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Obtener un evento por ID
router.get('/:id', async (req, res) => {
  try {
    const carouselC2 = await CarouselC2.findById(req.params.id);
    res.send(carouselC2);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Crear una nuevo evento
router.post('/', async (req, res) => {
  try {
    const carouselC2 = new CarouselC2(req.body);
    await carouselC2.save();
    res.send(carouselC2);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Actualizar un evento por ID
router.put('/:id', async (req, res) => {
  try {
    const carouselC2 = await CarouselC2.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(carouselC2);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Eliminar una evento por ID
router.delete('/:id', async (req, res) => {
  try {
    await CarouselC2.findByIdAndDelete(req.params.id);
    res.send('evento eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
