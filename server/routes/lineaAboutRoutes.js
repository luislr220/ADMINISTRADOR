const express = require('express');
const LineaAbout = require('../models/lineaAbout');

const router = express.Router();

// Obtener todas los eventos
router.get('/', async (req, res) => {
  try {
    const lineaAbout = await LineaAbout.find({});
    res.send(lineaAbout);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Obtener un evento por ID
router.get('/:id', async (req, res) => {
  try {
    const lineaAbout = await LineaAbout.findById(req.params.id);
    res.send(lineaAbout);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Crear una nuevo evento
router.post('/', async (req, res) => {
  try {
    const lineaAbout = new LineaAbout(req.body);
    await lineaAbout.save();
    res.send(lineaAbout);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Actualizar un evento por ID
router.put('/:id', async (req, res) => {
  try {
    const lineaAbout = await LineaAbout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(lineaAbout);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Eliminar una evento por ID
router.delete('/:id', async (req, res) => {
  try {
    await LineaAbout.findByIdAndDelete(req.params.id);
    res.send('evento eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
