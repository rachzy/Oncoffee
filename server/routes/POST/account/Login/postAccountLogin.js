const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");

rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 15 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const sendError = require("../../../../globalFunctions/sendError.js");

const Accounts = require("../../../../models/accounts");
const Users = require("../../../../models/users");

router.post("/", async (req, res) => {
  const { emailcpf, password } = req.body;

  if (!emailcpf || !password) return sendError(res, "INVALID_PARAMS", "");

  try {
    const getUserWithThatEmail = await Accounts.findOne({ emailcpf: emailcpf });

    if (!getUserWithThatEmail) {
      return sendError(res, "INVALID_CREDENTIALS", "EMAIL_NOT_FOUND");
    }

    if (!getUserWithThatEmail.verified) {
      return sendError(res, "ACCOUNT_NOT_VERIFIED");
    }

    const comparePasswords = await bcrypt.compare(
      password,
      getUserWithThatEmail.password
    );

    if (!comparePasswords) {
      return sendError(res, "INALID_CREDENTIALS", "WRONG_PASSWORD");
    }

    const { accountId, securityToken1, securityToken2 } = getUserWithThatEmail;
    const cookieMaxAge = 1000 * 60 * 60 * 24 * 30; // 1 month

    res.cookie("userId", accountId, {
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

    const getUserData = await Users.findOne({ userId: accountId });

    res.send({
      queryStatus: 200,
      userData: getUserData,
    });
  } catch (err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;
