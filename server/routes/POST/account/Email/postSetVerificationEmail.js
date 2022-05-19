const express = require("express");
const router = express.Router();

const sendError = require("../../../../globalFunctions/sendError.js");
const sendMail = require("../../../../globalFunctions/sendMail.js");

const server = require("../../../../server.js");

router.post("/", (req, res) => {
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

  server.db.query(
    "SELECT verificationCode, lastSentEmailTimestamp FROM accounts WHERE accountId = ? and registerToken = ?",
    [userId, registerToken],
    (err, result) => {
      if (err) return sendError(res, err.code, err.errno);
      if (result.length !== 1) return sendError(res, "ACCOUNT_NOT_FOUND", "");

      const verificationCode = result[0].verificationCode;

      const getCurrentTimestamp = new Date().getTime();
      const getLastSentTimestamp = parseInt(result[0].lastSentEmailTimestamp);

      const differenceBetweenTimestamps =
        getCurrentTimestamp - getLastSentTimestamp;

      if (differenceBetweenTimestamps < 60000) {
        return sendError(res, "RATE_LIMIT", differenceBetweenTimestamps);
      }

      server.db.query(
        "SELECT verificationEmail FROM accounts WHERE verificationEmail = ? and verified = 1",
        [email],
        (err2, result2) => {
          if (err2) return sendError(res, err2.code, err2.errno);

          if (result2.length !== 0) {
            return sendError(res, "EMAIL_ALREADY_IN_USE", "");
          }

          server.db.query(
            "UPDATE accounts SET verificationEmail = ?, lastSentEmailTimestamp = ? WHERE accountId = ?",
            [email, getCurrentTimestamp, userId],
            (err3, result3) => {
              if (err3) return sendError(res, err3.code, err3.errno);

              if (result3.affectedRows !== 1) {
                return sendError(res, "UNEXPECTED_INSERTION_ERROR", "");
              }

              const options = {
                code: verificationCode,
              };

              const sendVerificationEmail = async () => {
                await sendMail(email, "account-email-verification", options)
                  .catch((err) => {
                    return sendError(res, err, "");
                  })
                  .then((response) => {
                    if (response.isError)
                      return sendError(res, response.error, "");

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
    }
  );
});

module.exports = router;
