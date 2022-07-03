const express = require("express");
const router = express.Router();

const Ads = require("../../../models/ads.js");
const Promotions = require("../../../models/featuredPromotions.js");
const Products = require("../../../models/product.js");

const sendError = require("../../../globalFunctions/sendError.js");

//TO-DO LIST
//1. FIX PROGRAM NOT BEING ABLE TO SEND FEATURED PROMOTIONS COMPLETE ARRAY WITH PRODUCTS

//Get a specific slides collection by an identifier
router.get("/:identifier", async (req, res) => {
  const identifier = req.params.identifier;

  if (!identifier) return sendError(res, "UNDEFINED_IDENTIFIER", "UI");

  try {
    switch (identifier) {
      case "ads":
        const getAds = await Ads.find();
        res.send(getAds);
        break;
      case "featuredpromotions":
        let finalArray = [];
        const getPromotions = await Promotions.find();
        getPromotions.map(async (promotion) => {
          try {
            let getEndDate = new Date(promotion.endDate).getTime();
            let getNowDate = new Date().getTime();

            let distance = getEndDate - getNowDate;
            if (distance < 0) return;

            const getProduct = await Products.findOne({
              "productId": promotion.productId,
            });

            let finalProductObject = {
              ...getProduct,
              slideTypeClass: promotion.typeClass,
              slideEndDate: promotion.endDate,
            };

            finalArray.push(finalProductObject);
            if(finalArray.length !== getPromotions.length) return;
            console.log(finalArray);
            res.json(finalArray);
            res.end();
          } catch (err) {
            return sendError(res, err.message, err.code);
          }
        });
        res.send(finalArray);
        break;
      default:
        sendError(res, "UNKNOWN_CATEGORY", "UNKCTG");
    }
  } catch (err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;
