const express = require("express");
const sendError = require("../../../globalFunctions/sendError");
const router = express.Router();

const Product = require("../../../models/products");

router.post("/", async (req, res) => {
  const { newProduct } = req.body;

  if (!newProduct) return sendError(res, "INVALID_PARAMS");

  const productId = Math.floor(Math.random() * 1000000000);

  const product = new Product({
    productId: productId,
    ...newProduct,
  });

  try {
    const saveProduct = await product.save();
    res.send({ queryStatus: 200 });
  } catch (err) {
    sendError(res, err.code, err.message);
  }
});

module.exports = router;
