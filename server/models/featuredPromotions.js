const mongoose = require("mongoose");

const featuredPromotionsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
  typeClass: {
    type: Number,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("FeaturedPromotions", featuredPromotionsSchema);
