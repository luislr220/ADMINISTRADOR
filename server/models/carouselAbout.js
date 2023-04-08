const mongoose = require('mongoose');

const carouselAboutSchema = new mongoose.Schema({
  contentCaA: {
    type: String,
    required: true
  },
  imagesCaA: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('carouselAbout', carouselAboutSchema);
