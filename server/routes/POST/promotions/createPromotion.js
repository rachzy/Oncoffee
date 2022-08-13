const express = require("express");
const sendError = require("../../../globalFunctions/sendError.js");
const router = express.Router();

const Promotions = require("../../../models/featuredPromotions.js");

router.post("/", async (req, res) => {
  const { productId, typeClass, endDate } = req.body;

  const newPromotion = new Promotions({
    productId: productId,
    typeClass: typeClass,
    endDate: new Date(endDate),
  });
  try {
    const saveNewPromotion = await newPromotion.save();
    res.sendStatus(200);
  } catch (err) {
    return sendError(req, err.message, err.code);
  }
});

module.exports = router;
