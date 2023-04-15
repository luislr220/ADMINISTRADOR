const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: { type: String, required: true },
});

module.exports = mongoose.model("Event", eventSchema);
