const mongoose = require('mongoose');

const seccionH2CSchema = new mongoose.Schema({
  titleC: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model('SeccionH2C', seccionH2CSchema);