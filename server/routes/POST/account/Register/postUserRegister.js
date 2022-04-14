const express = require("express");
const router = express.Router();
const Axios = require("axios");

const bcrypt = require("bcrypt");
const saltRounds = 8;

const generateRandomString = require("../../../../globalFunctions/generateRandomString.js");
const sendError = require("../../../../globalFunctions/sendError.js");
const sendMail = require("../../../../globalFunctions/sendMail.js");

const server = require("../../../../server.js");

//Create and insert a new user in the database
router.post("/", (req, res) => {
  const [name, lastname, emailcpf, password] = [
    req.body.name.toString(),
    req.body.lastname.toString(),
    req.body.emailcpf.toString(),
    req.body.password.toString(),
  ];

  if (!name || !lastname || !emailcpf || !password)
    return sendError(res, "NOT_ENOUGH_PARAMETERS", "");

  if (
    name.length < 2 ||
    name.length > 50 ||
    lastname.length < 2 ||
    lastname.length > 50 ||
    emailcpf.length < 10 ||
    emailcpf.length > 50 ||
    password.length < 5
  )
    return sendError(res, "INVALID_PARAMETERS", "");

  const checkIfValueHasSign = emailcpf.split("@"); //Split the string in "@"
  const checkIfValueHasDot = emailcpf.split("."); //Split the string in "."

  let email = "";

  const validateEmail = () => {
    //Check if it's a valid email
    if (checkIfValueHasSign.length !== 2 && checkIfValueHasDot.length < 1) {
      return sendError(res, "INVALID_EMAIL", "");
    }

    return (email = emailcpf);
  };

  const validateCpf = () => {
    const checkIfValueHasScore = emailcpf.split("-"); //Split the string in "-", since CPFs have a "-"
    //But having a "-" is not a requirement to make the program read the value as a CPF

    //Even if there are no "-", the value can still be a CPF, and that's what the program will check
    if (checkIfValueHasScore.length === 1) {
      if (isNaN(emailcpf) || emailcpf.length !== 11)
        //If the value is not a number or if it doesn't have exactly 11 characters, then it's definitely not a CPF
        return sendError(res, "INVALID_EMAIL", "");
    }

    //If the Array length is 2, than the user in fact insert a "-" in the input value
    if (checkIfValueHasScore.length === 2) {
      const cutScore = emailcpf.replace("-", "");
      if (isNaN(cutScore)) {
        return sendError(res, "INVALID_EMAIL", "");
      }
    }

    //If the Array length is more than 2, then the CPF is not valid
    if (checkIfValueHasScore.length > 2) {
      return sendError(res, "INVALID_EMAIL", "");
    }
  };

  switch (checkIfValueHasSign.length) {
    case 1:
      validateCpf();
      break;
    case 2:
      validateEmail();
      break;
    default:
      return sendError(res, "INVALID_EMAIL", "");
  }

  //Check if that CPF/Email is already in use
  server.db.query(
    "SELECT * FROM accounts WHERE emailcpf = ?",
    [emailcpf],
    (err, result) => {
      if (err) return sendError(res, err.code, err.errno);

      if (result.length !== 0)
        return sendError(res, "EMAIL_ALREADY_IN_USE", "");

      //Generate user ID and Security Tokens by "generateRandomString" function
      const [
        generateUserId,
        generateRegisterToken,
        generateSecurityToken1,
        generateSecurityToken2,
        verificationCode,
      ] = [
        generateRandomString("number", 10),
        generateRandomString("string", 16),
        generateRandomString("string", 16),
        generateRandomString("string", 16),
        generateRandomString("number", 6),
      ];

      bcrypt.hash(password, saltRounds, (hashingError, hash) => {
        if (hashingError) return sendError(res, "PASSWORD_HASHING_ERROR", "");

        //Insert the account data in the database
        server.db.query(
          "INSERT INTO accounts (accountId, emailcpf, password, registerToken, securityToken1, securityToken2, verificationEmail, verificationCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            generateUserId,
            emailcpf,
            hash,
            generateRegisterToken,
            generateSecurityToken1,
            generateSecurityToken2,
            email,
            verificationCode,
          ],
          (err2, result2) => {
            if (err2) return sendError(res, err2.code, err2.errno);

            if (result2.affectedRows === 0)
              return sendError(res, "UNEXPECTED_INSERTION_ERROR", "");

            //Insert the user data in the database
            server.db.query(
              "INSERT INTO users (userId, userName, userLastName) VALUES (?, ?, ?)",
              [generateUserId, name, lastname],
              (err3, result3) => {
                if (err3) return sendError(res, err3.code, err3.errno);

                if (result3.affectedRows === 0) {
                  return sendError(res, "UNEXPECTED_INSERTION_ERROR", "");
                }

                if (email !== "") {
                  const options = {
                    code: verificationCode,
                  };
                  const sendVerificationEmail = sendMail(
                    email,
                    "account-email-verification",
                    options
                  );

                  console.log(sendVerificationEmail);
                }

                const message = {
                  message: "Account succeffully created!",
                  queryStatus: 200,
                  userInfo: {
                    userId: generateUserId,
                    registerToken: generateRegisterToken,
                  },
                };

                res.send(message);
              }
            );
          }
        );
      });
    }
  );
});

module.exports = router;
