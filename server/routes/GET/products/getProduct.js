const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const Products = require("../../../models/products");

//Get just a single product from the database by it's id
router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    
    if (!productId) return sendError(res, "INVALID_PARAMS");
    parseInt(productId);

    try {
      const findProduct = await Products.findOne({"productId": productId});

      if(!findProduct) {
        return sendError(res, "PRODUCT_NOT_FOUND");
      }
      res.send(findProduct);
    } catch(err) {
      sendError(res, err.messagge, err.code);
    }
});

module.exports = router;