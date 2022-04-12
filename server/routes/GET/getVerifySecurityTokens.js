const express = require("express");
const router = express.Router();

const sendError = require("../../globalFunctions/sendError.js");

const server = require("../../server.js");

//Verify if user's security tokens exists
router.get("/:userId/:securityToken1/:securityToken2", (req, res) => {
  if (
    !req.params.userId ||
    !req.params.securityToken1 ||
    !req.params.securityToken2
  )
    return;
  let [userId, securityToken1, securityToken2] = [
    req.params.userId,
    req.params.securityToken1,
    req.params.securityToken2,
  ];

  server.db.query(
    "SELECT * FROM accounts WHERE accountId = ? and securityToken1 = ? and securityToken2 = ?",
    [userId, securityToken1, securityToken2],
    (err, result) => {
      if (err) return sendError(res, err.code, err.errno);

      res.send(result);
    }
  );
});

module.exports = router;
