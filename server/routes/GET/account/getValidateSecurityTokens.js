const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const server = require("../../../server.js");

//Verify if user's security tokens exists
router.get("/", (req, res) => {
  const { userId, stoken1, stoken2 } = req.cookies;

  if (!userId || !stoken1 || !stoken2)
    return res.send({
      queryStatus: 200,
      isLoggedIn: false,
    });

  const errorCallback = (code, errno) => {
    res.clearCookie("userId");
    res.clearCookie("stoken1");
    res.clearCookie("stoken2");

    sendError(res, code, errno);
  };

  server.db.query(
    "SELECT securityToken1, securityToken2 FROM accounts WHERE accountId = ?",
    [userId],
    (err, result) => {
      if (err) return errorCallback(err.code, err.errno);
      if (result.length !== 1) return errorCallback("ACCOUNT_NOT_FOUND", "");

      const { securityToken1, securityToken2 } = result[0];

      if (stoken1 !== securityToken1 || stoken2 !== securityToken2) {
        return errorCallback("INVALID_TOKENS", "");
      }

      server.db.query(
        "SELECT * FROM users WHERE userId = ?",
        [userId],
        (err2, result2) => {
          if (err2) {
            return sendError(res, err2.message, err2.errno);
          }
          res.send({
            queryStatus: 200,
            isLoggedIn: true,
            userData: result2[0],
          });
        }
      );
    }
  );
});

module.exports = router;
