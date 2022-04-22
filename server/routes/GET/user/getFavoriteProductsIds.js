const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const server = require("../../../server.js");

//Get all the favorited products ids of an user
router.get("/", (req, res) => {
  const { userId } = req.cookies;

  if (!userId) return;

  server.db.query(
    "SELECT userFavoriteProducts FROM users WHERE userId = ?",
    [userId],
    (err, result) => {
      if (err) return sendError(res, err.code, err.errno);

      if (!result) return;

      res.send(result[0].userFavoriteProducts);
    }
  );
});

module.exports = router;
