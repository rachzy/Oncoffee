const express = require("express");
const sendError = require("../../../../globalFunctions/sendError");
const router = express.Router();

const sendMail = require("../../../../globalFunctions/sendMail");

const Accounts = require("../../../../models/accounts");

router.post("/", async (req, res) => {
  const [userId, registerToken] = [req.body.userId, req.body.registerToken];

  if (!userId || !registerToken) return sendError(res, "INVALID_PARAMS", "");

  try {
    const getUserRegisterInfo = await Accounts.findOne(
      { accountId: userId, registerToken: registerToken },
      { verificationEmail: 1, verificationCode: 1, lastSentEmailTimestamp: 1 }
    );

    if (!getUserRegisterInfo) {
      return sendError(res, "ACCOUNT_NOT_FOUND");
    }

    const getCurrentTimestamp = new Date().getTime();
    const getLastSentTimestamp = parseInt(
      getUserRegisterInfo.lastSentEmailTimestamp
    );

    const differenceBetweenTimestamps =
      getCurrentTimestamp - getLastSentTimestamp;

    if (differenceBetweenTimestamps < 60000) {
      return sendError(res, "RATE_LIMIT", differenceBetweenTimestamps);
    }

    await Accounts.updateOne(
      { accountId: userId },
      { $set: { lastSentEmailTimestamp: getCurrentTimestamp } }
    );

    const email = getUserRegisterInfo.verificationEmail;
    const code = getUserRegisterInfo.verificationCode;

    const options = {
      code: code,
    };

    await sendMail(email, "account-email-verification", options);

    res.send({ queryStatus: 200 });
  } catch (err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;
