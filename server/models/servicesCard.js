const mongoose = require('mongoose');

const servicesCardSchema = new mongoose.Schema({
  titleSC: {
    type: String,
    required: true
  },
  contentSC: {
    type: String,
    required: true
  },
  imagesSC: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ServicesCard', servicesCardSchema);
