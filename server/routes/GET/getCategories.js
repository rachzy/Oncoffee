const express = require("express");
const router = express.Router();

const sendError = require("../../globalFunctions/sendError.js");

const server = require('../../server.js');

//Get just a single product from the database by it's id
router.get("/", (req, res) => {
  server.db.query("SELECT * FROM categories", (err, result) => {
    if(err) return sendError(res, err.code, err.errno);
    
    res.send(result);
  });
});

module.exports = router;
