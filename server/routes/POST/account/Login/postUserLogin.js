const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 15, // Limit each IP to 15 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const sendError = require("../../../../globalFunctions/sendError.js");

const server = require("../../../../server.js");

router.post("/", (req, res) => {
  const { emailcpf, pass } = req.body;

  console.log(emailcpf);

  if (!emailcpf || !pass) return sendError(res, "INVALID_PARAMS", "");

  server.db.query(
    "SELECT userId, securityToken1, securityToken2, password FROM accounts WHERE emailcpf = ?",
    [emailcpf],
    (err, result) => {
      if (err) return sendError(res, err.code, err.errno);
      if (result.length !== 1) return sendError(res, "INVALID_CREDENTIALS", "");

      bcrypt.compare(pass, result[0], (errB, resultB) => {
        if (errB) return sendError(res, "PASSWORD_VALIDATION_ERROR", "");
        if (!resultB) return sendError("INVALID_PARAMS", "");

        const { userId, securityToken1, securityToken2 } = result[0];

        const cookieMaxAge = 24 * 60 * 60 * 30 * 2; // 2 months

        res.cookie("userId", userId, {
          maxAge: cookieMaxAge,
          httpOnly: true,
        });
        res.cookie("userId", securityToken1, {
          maxAge: cookieMaxAge,
          httpOnly: true,
        });
        res.cookie("userId", securityToken2, {
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
