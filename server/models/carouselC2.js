const mongoose = require('mongoose');

const carouselC2Schema = new mongoose.Schema({
  imagesC2: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('CarouselC2', carouselC2Schema);
