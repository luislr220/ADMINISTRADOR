const mongoose = require('mongoose');

const carouselC1Schema = new mongoose.Schema({
  imagesC1: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('CarouselC1', carouselC1Schema);
