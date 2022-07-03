const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const server = require('../../../server.js');

//Get just a single product from the database by it's id
router.get('/:id', (req, res) => {
    const id = req.params.id;

    if (!id) return;
    server.db.query(
      "SELECT * FROM products WHERE productId = ?", [id],
      (err, result) => {
        if (err) {
          sendError(res, err.code, err.errno);
          return;
        }
        res.send(result[0]);
      }
    );
});

module.exports = router;