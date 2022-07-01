const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  categoryId: {
    type: Number,
    required: true
  },
  categoryName: {
    type: String,
    required: true
  },
  categoryImg: {
    type: String,
    required: true
  },
  categorySubcategories: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Categories", categoriesSchema);