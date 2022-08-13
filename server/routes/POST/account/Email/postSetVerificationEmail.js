const express = require("express");
const router = express.Router();

const sendError = require("../../../../globalFunctions/sendError.js");
const sendMail = require("../../../../globalFunctions/sendMail.js");

const Accounts = require("../../../../models/accounts");

router.post("/", async (req, res) => {
  const [userId, registerToken, email] = [
    req.body.userId,
    req.body.registerToken,
    req.body.email,
  ];

  if (!userId || !registerToken || !email)
    return sendError(res, "INVALID_PARAMS", "");

  const splitEmailInSigns = email.split("@");
  const splitEmailInDots = email.split(".");

  if (
    email.length < 10 ||
    splitEmailInSigns.length !== 2 ||
    splitEmailInDots < 1
  )
    return sendError(res, "INVALID_EMAIL", "");

  try {
    const getUserRegisterInfo = await Accounts.findOne(
      { accountId: userId, registerToken: registerToken },
      { verificationCode: 1, lastSentEmailTimestamp: 1 }
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

    const checkIfEmailIsAlreadyInUse = await Accounts.findOne(
      { verificationEmail: email, verified: true },
      { verificationCode: 1, lastSentEmailTimestamp: 1 }
    );

    if (checkIfEmailIsAlreadyInUse.length !== 0) {
      return sendError(res, "EMAIL_ALREADY_IN_USE");
    }

    await Accounts.updateOne(
      { accountId: userId },
      {
        $set: {
          verificationEmail: email,
          lastSentEmailTimestamp: getCurrentTimestamp,
        },
      }
    );

    const options = {
      code: verificationCode,
    };

    await sendMail(email, "account-email-verification", options);

    res.send({ queryStatus: 200 });
  } catch (err) {
    return sendError(res, err.messagge, err.code);
  }
});

module.exports = router;
