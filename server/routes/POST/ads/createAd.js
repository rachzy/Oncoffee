const express = require("express");
const sendError = require("../../../globalFunctions/sendError.js");
const router = express.Router();

const Ads = require("../../../models/ads.js");

router.post("/", async (req, res) => {
  const { name, imgSrc, imgAlt } = req.body;

  try {
    const newAd = new Ads({
      name: name,
      imgSrc: imgSrc,
      imgAlt: imgAlt,
    });
    const saveAd = await newAd.save();

    res.sendStatus(200);
  } catch (err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;
