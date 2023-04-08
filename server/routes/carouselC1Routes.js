const express = require('express');
const CarouselC1 = require('../models/carouselC1');

const router = express.Router();

// Obtener todas los eventos
router.get('/', async (req, res) => {
  try {
    const carouselC1 = await CarouselC1.find({});
    res.send(carouselC1);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Obtener un evento por ID
router.get('/:id', async (req, res) => {
  try {
    const carouselC1 = await CarouselC1.findById(req.params.id);
    res.send(carouselC1);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Crear una nuevo evento
router.post('/', async (req, res) => {
  try {
    const carouselC1 = new CarouselC1(req.body);
    await carouselC1.save();
    res.send(carouselC1);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Actualizar un evento por ID
router.put('/:id', async (req, res) => {
  try {
    const carouselC1 = await CarouselC1.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(carouselC1);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Eliminar una evento por ID
router.delete('/:id', async (req, res) => {
  try {
    await CarouselC1.findByIdAndDelete(req.params.id);
    res.send('evento eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
