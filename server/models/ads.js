const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
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
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Ads", adsSchema);
