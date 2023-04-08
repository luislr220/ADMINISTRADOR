const mongoose = require('mongoose');

const seccionH2Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('SeccionH2', seccionH2Schema);