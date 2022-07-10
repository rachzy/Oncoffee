const express = require("express");
const router = express.Router();

const Categories = require("../../../models/categories.js");

router.post("/", async (req, res) => {
  const { categoryId, categoryName, categoryImg, categorySubcategories } =
    req.body;

  const newCategory = new Categories({
    categoryId: categoryId,
    categoryName: categoryName,
    categoryImg: categoryImg,
    categorySubcategories: categorySubcategories,
  });
  try {
    const postCategory = await newCategory.save();
    res.sendStatus(200);
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
});

module.exports = router;
