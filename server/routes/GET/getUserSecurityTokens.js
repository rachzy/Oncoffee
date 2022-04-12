const express = require("express");
const router = express.Router();

const sendError = require("../../globalFunctions/sendError.js");

const server = require("../../server.js");

//Get an user security tokens by an id
router.get("/:userId", (req, res) => {
    if (!req.params.userId) return;
    let userId = req.params.userId;

    server.db.query(
     "SELECT accountSecurityToken1, accountSecurityToken2 FROM accounts WHERE accountId = ?", [userId],
      (err, result) => {
        if (err) return sendError(res, err.code, err.errno);
        
        res.send(result[0]);
      }
    );
});

module.exports = router;
