//Function that will generate a random string with all upperCase characters containing numbers and letters
//It was made to be used as tokens
const crypto = require("crypto");

function generateRandomCode(type, length) {
  if (isNaN(length)) return;

  switch (type) {
    //If the type is "number", the program will generate a string that contains only numbers
    case "number":
      //The program will generate a really large string by multiplying the length value for 10,
      //then select every number from it by using a replace() that will cut every number from the string
      let randomNumber = crypto
        .randomBytes(length * 10)
        .toString("hex")
        .replace(/\D/g, "");
      return randomNumber.slice(0, length);
    default:
      return crypto.randomBytes(length).toString("hex").toUpperCase();
  }
}

module.exports = generateRandomCode;
