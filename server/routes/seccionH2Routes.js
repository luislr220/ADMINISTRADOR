const express = require('express');
const SeccionH2 = require('../models/seccionH2');

const router = express.Router();

// Obtener todas los eventos
router.get('/', async (req, res) => {
  try {
    const seccionH2 = await SeccionH2.find({});
    res.send(seccionH2);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Obtener un evento por ID
router.get('/:id', async (req, res) => {
  try {
    const seccionH2 = await SeccionH2.findById(req.params.id);
    res.send(seccionH2);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Crear una nuevo evento
router.post('/', async (req, res) => {
  try {
    const seccionH2 = new SeccionH2(req.body);
    await seccionH2.save();
    res.send(seccionH2);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Actualizar un evento por ID
router.put('/:id', async (req, res) => {
  try {
    const seccionH2 = await SeccionH2.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(seccionH2);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Eliminar una evento por ID
router.delete('/:id', async (req, res) => {
  try {
    await SeccionH2.findByIdAndDelete(req.params.id);
    res.send('evento eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
