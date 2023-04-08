const express = require('express');
const ServicesCard = require('../models/servicesCard');

const router = express.Router();

// Obtener todas los eventos
router.get('/', async (req, res) => {
  try {
    const servicesCard = await ServicesCard.find({});
    res.send(servicesCard);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Obtener un evento por ID
router.get('/:id', async (req, res) => {
  try {
    const servicesCard = await ServicesCard.findById(req.params.id);
    res.send(servicesCard);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Crear una nuevo evento
router.post('/', async (req, res) => {
  try {
    const servicesCard = new ServicesCard(req.body);
    await servicesCard.save();
    res.send(servicesCard);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Actualizar un evento por ID
router.put('/:id', async (req, res) => {
  try {
    const servicesCard = await ServicesCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(servicesCard);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Eliminar una evento por ID
router.delete('/:id', async (req, res) => {
  try {
    await ServicesCard.findByIdAndDelete(req.params.id);
    res.send('evento eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
