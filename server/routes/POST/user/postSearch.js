const express = require("express");
const router = express.Router();

const Searches = require("../../../models/searches");

const sendError = require("../../../globalFunctions/sendError.js");
const generateRandomCode = require("../../../globalFunctions/generateRandomCode");

//Post user search on the search table
router.post("/", async (req, res) => {
  //Get parameters
  const { userId } = req.cookies;
  // const { userId } = req.body;
  const { searchValue } = req.body;

  if (!userId || !searchValue) {
    return sendError(res, "INVALID_PARAMS");
  }

  const newSearch = new Searches({
    searchId: generateRandomCode("number", 15),
    searchValue: searchValue,
    searchUserId: userId,
  });

  try {
    await newSearch.save();
    res.send({ queryStatus: 200 });
  } catch (err) {
    sendError(res, err.message, err.code);
  }
});

module.exports = router;
