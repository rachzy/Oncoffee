const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const Products = require("../../../models/products");

//Get specific products from the database through a identifier param (Ex: discount, capsules, etc)
router.get("/:inputValue", async (req, res) => {
  const { inputValue } = req.params;

  try {
    const getProducts = await Products.find(
      {
        productTitle: { $regex: inputValue.toString(), $options: "i" },
        productEnabled: true,
      },
      { productId: 1, productTitle: 1 }
    )
      .limit(100)
      .distinct("productTitle");

    let finalProducts = [];
    getProducts.forEach((productTitle) => {
      let productObject = {
        productId: Math.random(),
        productTitle: productTitle,
      };
      finalProducts.push(productObject);
    });

    res.send(finalProducts);
  } catch (err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;
