const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    default: Math.floor(Math.random() * 10000000)
  },
  name: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    required: true
  },
  imgAlt: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date()
  }
});

module.exports = mongoose.model("Ads", adsSchema);
