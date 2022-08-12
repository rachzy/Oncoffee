const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const Products = require("../../../models/products");

//Get specific products from the database through a identifier param (Ex: discount, capsules, etc)
router.get("/:identifier/", async (req, res) => {
  const { identifier } = req.params;

  if (!identifier) {
    return sendError(res, "INVALID_PARAMS");
  }

  try {
    switch (identifier) {
      case "otherproducts":
        const getOtherProducts = await Products.find({
          productEnabled: true,
        }).limit(100);
        res.send(getOtherProducts);
        break;
      case "capsules":
        const getCapsulesProducts = await Products.find({
          productCategory: "CAPSULAS",
          productEnabled: true,
        })
          .sort({ productTotalOrders: -1 })
          .limit(5);
        res.send(getCapsulesProducts);
        break;
      case "mostsolds":
        const getMostSoldProducts = await Products.find({
          productEnabled: true,
        })
          .sort({ productTotalOrders: -1 })
          .limit(5);
        res.send(getMostSoldProducts);
        break;
      case "discount":
        const getProductsWithGreatestDiscounts = await Products.find({
          productEnabled: true,
        })
          .sort({ "productPrice.discount": -1 })
          .limit(5);
        res.send(getProductsWithGreatestDiscounts);
        break;
      default:
        const getProductsAccordingToIdentifier = await Products.find(
          {
            productCategory: identifier.toUpperCase(),
            productEnabled: true,
          },
          {
            productId: 1,
            productTitle: 1,
            productImage: 1,
            productPrice: 1,
          }
        )
          .sort({ "productRate.finalRate": -1 })
          .limit(3);
        res.send(getProductsAccordingToIdentifier);
    }
  } catch (err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;
