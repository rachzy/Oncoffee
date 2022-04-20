const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const server = require("../../../server.js");
//Post user search on the search table
router.post("/", (req, res) => {
  //Get parameters
  const {userId} = req.cookies;
  const searchValue = req.body.searchValue;

  if (!userId || !searchValue || userId === "" || searchValue === "") return;

  //Create a date timestamp and get currently milliseconds
  const currentTime = new Date().getTime();

  //Insert data
  server.db.query(
    "INSERT INTO searches (searchValue, searchUserId, searchTimeMs) VALUES (?, ?, ?)",
    [searchValue, userId, currentTime],
    (err) => {
      if (err) return sendError(res, err.code, err.errno);
    }
  );
  res.end();
});

module.exports = router;
