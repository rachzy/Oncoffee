const express = require("express");
const sendError = require("../../../globalFunctions/sendError");
const router = express.Router();

const Accounts = require("../../../models/accounts.js");

router.get("/:accountId/:registerToken", async (req, res) => {
  const [accountId, registerToken] = [
    req.params.accountId,
    req.params.registerToken,
  ];

  if (!accountId || !registerToken) return sendError(res, "INVALID_PARAMS", "");

  try {
    const getVerificationEmail = await Accounts.findOne({
      accountId: accountId,
      registerToken: registerToken,
    });

    if (!getVerificationEmail) {
      return sendError(res, "INVALID_ACCOUNT", "");
    }

    const { verified, verificationEmail } = getVerificationEmail;

    if (verified === 1) return sendError(res, "ALREADY_VERIFIED", "");

    let email = {
      isUsing: false,
      email: null,
    };

    if (verificationEmail) {
      email = {
        isUsing: true,
        email: verificationEmail,
      };
    }

    res.send({
      queryStatus: 200,
      email: email,
    });
  } catch (err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;
