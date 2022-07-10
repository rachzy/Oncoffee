const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const Products = require("../../../models/products");

//Get specific products from the database through a identifier param (Ex: discount, capsules, etc)
router.get("/:inputValue", async (req, res) => {
  const { inputValue } = req.params;

  try {
    const getProducts = await Products.find({
      productTitle: { $regex: inputValue, $options: "i" },
      productEnabled: true,
    }).limit(100);
    res.send(getProducts);
  } catch (err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;
