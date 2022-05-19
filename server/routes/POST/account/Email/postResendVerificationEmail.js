const express = require("express");
const sendError = require("../../../../globalFunctions/sendError");
const router = express.Router();

const sendMail = require("../../../../globalFunctions/sendMail");

const server = require("../../../../server.js");

router.post("/", (req, res) => {
  const [userId, registerToken] = [req.body.userId, req.body.registerToken];

  if (!userId || !registerToken) return sendError(res, "INVALID_PARAMS", "");

  server.db.query(
    "SELECT verificationEmail, verificationCode, lastSentEmailTimestamp FROM accounts WHERE accountId = ? and registerToken = ?",
    [userId, registerToken],
    (err, result) => {
      if (err) return sendError(res, err.code, err.errno);
      if (result.length !== 1) return sendError(res, "ACCOUNT_NOT_FOUND", "");

      const getCurrentTimestamp = new Date().getTime();
      const getLastSentTimestamp = parseInt(result[0].lastSentEmailTimestamp);

      const differenceBetweenTimestamps =
        getCurrentTimestamp - getLastSentTimestamp;

      if (differenceBetweenTimestamps < 60000) {
        return sendError(res, "RATE_LIMIT", differenceBetweenTimestamps);
      }

      server.db.query(
        "UPDATE accounts SET lastSentEmailTimestamp = ? WHERE accountId = ?",
        [getCurrentTimestamp, userId],
        (err2, result2) => {
          if (err2) return sendError(res, err2.code, err2.errno);
          if (result2.affectedRows === 0)
            return sendError(res, "UNEXPECTED_INSERTION_ERROR", "");

          const sendVerificationEmail = async () => {
            const email = result[0].verificationEmail;
            const code = result[0].verificationCode;

            const options = {
              code: code,
            };

            await sendMail(email, "account-email-verification", options)
              .catch((err) => {
                return sendError(res, err, "");
              })
              .then((response) => {
                if (response.isError) return sendError(res, response.error, "");

                res.send({
                  queryStatus: 200,
                });
              });
          };
          sendVerificationEmail();
        }
      );
    }
  );
});

module.exports = router;
