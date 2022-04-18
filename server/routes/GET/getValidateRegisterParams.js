const express = require("express");
const sendError = require("../../globalFunctions/sendError");
const router = express.Router();

const server = require("../../server.js");

router.get("/:accountId/:registerToken", (req, res) => {
  const [accountId, registerToken] = [
    req.params.accountId,
    req.params.registerToken,
  ];

  if (!accountId || !registerToken) return sendError(res, 'INVALID_PARAMS', '');;

  server.db.query(
    "SELECT verificationEmail, verified FROM accounts WHERE accountId = ? and registerToken = ?",
    [accountId, registerToken],
    (err, result) => {
        if(err) return sendError(res, err.code, err.errno);
        if(result.length !== 1) return sendError(res, 'INVALID_PARAMS', '');

        const { verified, verificationEmail } = result[0];

        if(verified === 1) return sendError(res, 'ALREADY_VERIFIED', '');

        let email = {
          isUsing: false,
          email: null
        }

        if(verificationEmail !== null) {
          email = {
            isUsing: true,
            email: verificationEmail
          }
        }

        res.send({
          queryStatus: 200,
          email: email
        });
    }
  );
});

module.exports = router;
