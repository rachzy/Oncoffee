const express = require("express");
const router = express.Router();

const sendError = require("../../../../globalFunctions/sendError");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.use(limiter);

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const Accounts = require("../../../../models/accounts");

router.post("/", async (req, res) => {
  const { userId, registerToken, verificationCode } = req.body;

  if (!userId || !registerToken || !verificationCode) {
    return sendError(res, "INVALID_PARAMS");
  }

  try {
    const getAccountData = await Accounts.findOne({
      accountId: userId,
      registerToken: registerToken,
    });

    if (!getAccountData) {
      return sendError(res, "ACCOUNT_NOT_FOUND");
    }

    const { verified, securityToken1, securityToken2 } =
      getAccountData;

    if (verified) {
      return sendError(res, "ACCOUNT_ALREADY_VERIFIED");
    }

    if (verificationCode.toString() !== getAccountData.verificationCode.toString()) {
      return sendError(res, "INVALID_CODE");
    }

    await Accounts.updateOne(
      { accountId: userId },
      { $set: { verified: true } }
    );

    const cookieMaxAge = 1000 * 60 * 60 * 24 * 30 * 2; // 2 months

    res.cookie("userId", userId, {
      maxAge: cookieMaxAge,
      httpOnly: true,
    });
    res.cookie("stoken1", securityToken1, {
      maxAge: cookieMaxAge,
      httpOnly: true,
    });
    res.cookie("stoken2", securityToken2, {
      maxAge: cookieMaxAge,
      httpOnly: true,
    });

    res.send({
      queryStatus: 200,
    });
  } catch (err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;
