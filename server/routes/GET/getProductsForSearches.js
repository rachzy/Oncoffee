const express = require("express");
const router = express.Router();

const sendError = require("../../globalFunctions/sendError.js");

const server = require("../../server.js");

//Get specific products from the database through a identifier param (Ex: discount, capsules, etc)
router.get("/:inputValue", (req, res) => {
  const inputValue = req.params.inputValue;

  server.db.query(
    "SELECT DISTINCT productName productId, productName FROM products WHERE productEnabled = 1 and productName LIKE ? LIMIT 100",
    [`%${inputValue}%`],
    (err, result) => {
      if (err) return sendError(res, err.code, err.errno);

      res.send(result);
    }
  );
});

module.exports = router;
