const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const Categories = require("../../../models/categories.js");

//Get just a single product from the database by it's id
router.get("/", async (req, res) => {
  try {
    const getCategories = await Categories.find();
    res.send(getCategories);
  } catch(err) {
    return sendError(res, err.message, err.code)
  }
});

module.exports = router;
