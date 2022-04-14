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

const server = require("../../../../server.js");

router.post("/", (req, res) => {
  const [userId, registerToken, verificationCode] = [
    req.body.userId,
    req.body.registerToken,
    req.body.verificationCode,
  ];

  if (!userId || !registerToken || !verificationCode)
    return sendError(res, "INVALID_PARAMS", "");

  server.db.query(
    "SELECT accountId, securityToken1, securityToken2, verificationCode, verified FROM accounts WHERE accountId = ? and registerToken = ?",
    [userId, registerToken],
    (err, result) => {
      if (err) return sendError(res, err.code, err.errno);
      if (result.length !== 1) return sendError(res, "ACCOUNT_NOT_FOUND", "");
      if (result[0].verified === 1)
        return sendError(res, "ACCOUNT_ALREADY_VERIFIED", "");
      if (
        result[0].verificationCode.toString() !== verificationCode.toString()
      ) {
        return sendError(res, "INVALID_CODE", "");
      }

      server.db.query(
        "UPDATE accounts SET verified = 1 WHERE accountId = ?",
        [userId],
        (err2, result2) => {
          if (err2) return sendError(res, err2.code, err2.errno);
          if (result2.affectedRows !== 1) {
            return sendError(res, "UNEXPECTED_INSERTION_ERROR", "");
          }

          const {securityToken1, securityToken2} = result[0];

          const cookieMaxAge = 60 * 60 * 24 * 30 * 2 // 2 months

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
        }
      );
    }
  );
});

module.exports = router;
