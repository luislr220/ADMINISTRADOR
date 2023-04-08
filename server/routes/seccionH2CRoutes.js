const express = require('express');
const SeccionH2C = require('../models/seccionH2C');

const router = express.Router();

// Obtener todas los eventos
router.get('/', async (req, res) => {
  try {
    const seccionH2C = await SeccionH2C.find({});
    res.send(seccionH2C);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Obtener un evento por ID
router.get('/:id', async (req, res) => {
  try {
    const seccionH2C = await SeccionH2C.findById(req.params.id);
    res.send(seccionH2C);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Crear una nuevo evento
router.post('/', async (req, res) => {
  try {
    const seccionH2C = new SeccionH2C(req.body);
    await seccionH2C.save();
    res.send(seccionH2C);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Actualizar un evento por ID
router.put('/:id', async (req, res) => {
  try {
    const seccionH2C = await SeccionH2C.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(seccionH2C);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Eliminar una evento por ID
router.delete('/:id', async (req, res) => {
  try {
    await SeccionH2C.findByIdAndDelete(req.params.id);
    res.send('evento eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
