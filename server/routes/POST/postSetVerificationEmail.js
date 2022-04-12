const express = require("express");
const router = express.Router();

const sendError = require("../../globalFunctions/sendError.js");
const sendMail = require("../../globalFunctions/sendMail.js");

const server = require("../../server.js");

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
    "SELECT verificationCode FROM accounts WHERE accountId = ? and registerToken = ?",
    [userId, registerToken],
    (err, result) => {
      if (err) return sendError(res, err.code, err.errno);
      if (result.length !== 1) return sendError(res, "ACCOUNT_NOT_FOUND", "");

      const verificationCode = result[0].verificationCode;

      const getCurrentTimestamp = new Date().getTime();

      server.db.query(
        "UPDATE accounts SET verificationEmail = ?, lastSentEmailTimestamp = ? WHERE accountId = ?",
        [email, getCurrentTimestamp, userId],
        (err2, result2) => {
          if (err2) return sendError(res, err2.code, err2.errno);

          if (result2.affectedRows === 1) {
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
        }
      );
    }
  );
});

module.exports = router;
