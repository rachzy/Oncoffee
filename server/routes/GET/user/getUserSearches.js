const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const Searches = require("../../../models/searches");

//Get just a single product from the database by it's id
router.get("/", async (req, res) => {
  // const { userId } = req.cookies;
  const { userId } = req.cookies;

  if (!userId) return;

  try {
    const getUserSearches = await Searches.find({searchUserId: userId}).sort({searchTime: 1});
    res.send(getUserSearches);
  } catch(err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;
