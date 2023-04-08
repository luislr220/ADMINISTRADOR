const express = require('express');
const Innovation = require('../models/innovation');

const router = express.Router();

// Obtener todas los eventos
router.get('/', async (req, res) => {
  try {
    const innovation = await Innovation.find({});
    res.send(innovation);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Obtener un evento por ID
router.get('/:id', async (req, res) => {
  try {
    const innovation = await Innovation.findById(req.params.id);
    res.send(innovation);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Crear una nuevo evento
router.post('/', async (req, res) => {
  try {
    const innovation = new Innovation(req.body);
    await innovation.save();
    res.send(innovation);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Actualizar un evento por ID
router.put('/:id', async (req, res) => {
  try {
    const innovation = await Innovation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(innovation);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Eliminar una evento por ID
router.delete('/:id', async (req, res) => {
  try {
    await Innovation.findByIdAndDelete(req.params.id);
    res.send('evento eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
