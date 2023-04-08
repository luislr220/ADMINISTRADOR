const mongoose = require('mongoose');

const lineaAboutSchema = new mongoose.Schema({
  titleLA: {
    type: String,
    required: true
  },
  contentLA: {
    type: String,
    required: true
  },
  yearLA: {
    type: String,
    required: true
    
  }
});

module.exports = mongoose.model('LineaAbout', lineaAboutSchema);
