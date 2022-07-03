const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 8;

const generateRandomCode = require("../../../../globalFunctions/generateRandomCode.js");
const sendError = require("../../../../globalFunctions/sendError.js");
const sendMail = require("../../../../globalFunctions/sendMail.js");

const Accounts = require("../../../../models/accounts.js");
const Users = require("../../../../models/users.js");

const accountTemplate = require("./accountTemplate.json");

const server = require("../../../../server.js");

//Create and insert a new user in the database
router.post("/", async (req, res) => {
  const { name, lastName, emailcpf, password } = req.body;

  if (!name || !lastName || !emailcpf || !password) {
    return sendError(res, "NOT_ENOUGH_PARAMETERS", "");
  }

  if (
    name.length < 2 ||
    name.length > 50 ||
    lastName.length < 2 ||
    lastName.length > 50 ||
    emailcpf.length < 10 ||
    emailcpf.length > 50 ||
    password.length < 5
  ) {
    return sendError(res, "INVALID_PARAMETERS", "");
  }

  const checkIfValueHasSign = emailcpf.split("@"); //Split the string in "@"
  const checkIfValueHasDot = emailcpf.split("."); //Split the string in "."

  let email = "";

  const validateEmail = () => {
    //Check if it's a valid email
    if (checkIfValueHasSign.length !== 2 || checkIfValueHasDot.length < 2) {
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
      emailcpf = emailcpf.replace("-", "");
      if (isNaN(emailcpf) || emailcpf.length !== 11) {
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
  try {
    const checkIfThereAreAccountsWithThatEmailOrCPF = await Accounts.find({
      emailcpf: emailcpf,
    });
    if (checkIfThereAreAccountsWithThatEmailOrCPF.length !== 0) {
      return sendError(res, "EMAIL_ALREADY_IN_USE", "");
    }

    //Generate user ID and Security Tokens by "generateRandomCode" function
    const [
      generateUserId,
      generateRegisterToken,
      generateSecurityToken1,
      generateSecurityToken2,
      verificationCode,
    ] = [
      generateRandomCode("number", 10),
      generateRandomCode("string", 16),
      generateRandomCode("string", 16),
      generateRandomCode("string", 16),
      generateRandomCode("number", 6),
    ];

    const hashPassword = await bcrypt.hash(password, saltRounds);

    //Insert the account data in the database
    const newAccount = new Accounts({
      accountId: generateUserId,
      emailcpf: emailcpf,
      password: hashPassword,
      registerToken: generateRegisterToken,
      securityToken1: generateSecurityToken1,
      securityToken2: generateSecurityToken2,
      verificationEmail: email,
      verificationCode: verificationCode,
    });

    const saveNewAccount = await newAccount.save();

    const newUser = new Users({
      userId: generateUserId,
      userName: name,
      userLastName: lastName,
    });

    const saveNewUser = await newUser.save();

    //Send email if email is not null
    if (email) {
      const options = {
        code: verificationCode,
      };
      await sendMail(email, "account-email-verification", options);
    }

    const message = {
      message: "Account successfully created!",
      queryStatus: 200,
      userInfo: {
        userId: generateUserId,
        registerToken: generateRegisterToken,
      },
    };

    res.send(message);
  } catch (err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;
