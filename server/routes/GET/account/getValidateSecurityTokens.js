const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const Accounts = require("../../../models/accounts.js");
const Users = require("../../../models/users.js");

//Verify if user's security tokens exists
router.get("/", async (req, res) => {
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

  try {
    const account = await Accounts.findOne({ accountId: userId });
    if (!account) return errorCallback("ACCOUNT_NOT_FOUND", "");

    const { securityToken1, securityToken2 } = account;

    if (stoken1 !== securityToken1 || stoken2 !== securityToken2) {
      return errorCallback("INVALID_TOKENS", "");
    }

    const user = await Users.findOne({ userId: userId });
    res.send({
      queryStatus: 200, 
      isLoggedIn: true,
      userData: user,
    });
  } catch (err) {
    return errorCallback(err.message, err.code);
  }
});

module.exports = router;
