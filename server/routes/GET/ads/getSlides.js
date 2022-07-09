const express = require("express");
const router = express.Router();

const Ads = require("../../../models/ads.js");
const Promotions = require("../../../models/featuredPromotions.js");
const Products = require("../../../models/products.js");

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
        const getPromotions = await Promotions.find();
        let finalArray = [];
        //Map wasn't working, so I had to do it through a for loop
        for (let i = 0; i <= getPromotions.length - 1; i++) {
          let getEndDate = new Date(getPromotions[i].endDate).getTime();
          let getNowDate = new Date().getTime();

          let distance = getEndDate - getNowDate;
          if (distance > 0) {
            const getProduct = await Products.findOne({
              productId: getPromotions[i].productId,
            });

            let finalProductObject = {
              ...getProduct["_doc"],
              slideTypeClass: getPromotions[i].typeClass,
              slideEndDate: getPromotions[i].endDate,
            };

            finalArray.push(finalProductObject);
          }
        }
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
