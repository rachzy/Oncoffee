const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");

rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 15, // Limit each IP to 15 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const sendError = require("../../../../globalFunctions/sendError.js");

const server = require("../../../../server.js");

router.post("/", (req, res) => {
  const { emailcpf, password } = req.body;

  if (!emailcpf || !password) return sendError(res, "INVALID_PARAMS", "");

  server.db.query(
    "SELECT accountId, securityToken1, securityToken2, password FROM accounts WHERE emailcpf = ?",
    [emailcpf],
    (err, result) => {
      if (err) return sendError(res, err.code, err.errno);
      if (result.length !== 1) return sendError(res, "INVALID_CREDENTIALS", "");

      bcrypt.compare(password, result[0].password, (errB, resultB) => {
        if (errB) return sendError(res, "PASSWORD_VALIDATION_ERROR", "");
        if (!resultB) return sendError(res, "INVALID_CREDENTIALS", "");

        console.log("passed 2");

        const { accountId, securityToken1, securityToken2 } = result[0];

        const cookieMaxAge = 1000 * 60 * 60 * 24 * 30; // 2 months

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

        res.send({
          queryStatus: 200,
        });
      });
    }
  );
});

module.exports = router;
