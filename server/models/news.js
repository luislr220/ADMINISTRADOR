const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  images: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
    
  }
});

module.exports = mongoose.model('News', newsSchema);
