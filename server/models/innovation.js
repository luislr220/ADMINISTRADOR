const mongoose = require('mongoose');

const innovationSchema = new mongoose.Schema({
  titleInn: {
    type: String,
    required: true
  },
  contentInn: {
    type: String,
    required: true
  },
  imagesInn: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Innovation', innovationSchema);
