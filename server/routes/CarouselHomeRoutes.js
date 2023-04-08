const express = require('express');
const CarouselHome = require('../models/carouselHome');

const router = express.Router();

// Obtener todas los eventos
router.get('/', async (req, res) => {
  try {
    const carouselHome = await CarouselHome.find({});
    res.send(carouselHome);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Obtener un evento por ID
router.get('/:id', async (req, res) => {
  try {
    const carouselHome = await CarouselHome.findById(req.params.id);
    res.send(carouselHome);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Crear una nuevo evento
router.post('/', async (req, res) => {
  try {
    const carouselHome = new CarouselHome(req.body);
    await carouselHome.save();
    res.send(carouselHome);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Actualizar un evento por ID
router.put('/:id', async (req, res) => {
  try {
    const carouselHome = await CarouselHome.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(carouselHome);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Eliminar una evento por ID
router.delete('/:id', async (req, res) => {
  try {
    await CarouselHome.findByIdAndDelete(req.params.id);
    res.send('evento eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
