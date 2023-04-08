const mongoose = require('mongoose');

const carouselHomeSchema = new mongoose.Schema({
  images: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('CarouselHome', carouselHomeSchema);
