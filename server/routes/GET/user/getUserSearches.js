const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const server = require("../../../server.js");

//Get just a single product from the database by it's id
router.get("/", (req, res) => {
  const { userId } = req.cookies;

  if (!userId) return;
  server.db.query(
    "SELECT DISTINCT searchValue searchId, searchValue searchValue FROM searches WHERE searchUserId = ? and searchValue != '' ORDER BY searchTimeMs DESC LIMIT 10",
    [userId],
    (err, result) => {
      if (err) return sendError(res, err.code, err.errno);

      res.send(result);
    }
  );
});

module.exports = router;
