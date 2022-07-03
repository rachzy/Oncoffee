const mongoose = require("mongoose");

const SubCategories = [
  {
    name: {
      type: String,
      required: true,
    },
  },
];

const categoriesSchema = new mongoose.Schema({
  categoryId: {
    type: Number,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  categoryImg: {
    type: String,
    required: true,
  },
  categorySubcategories: {
    type: SubCategories,
    required: true,
  },
});

module.exports = mongoose.model("Categories", categoriesSchema);
