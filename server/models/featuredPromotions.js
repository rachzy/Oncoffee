const mongoose = require("mongoose");

const featuredPromotionsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    default: Math.floor(Math.random() * 1000000)
  },
  productId: {
    type: Number,
    required: true,
  },
  typeClass: {
    type: Number,
    required: true,
    default: 1
  },
  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("FeaturedPromotions", featuredPromotionsSchema);
