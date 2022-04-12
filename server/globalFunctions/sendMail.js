require("dotenv").config();

const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "923b4aed944f22",
    pass: "2a365b2dd53849",
  },
});

const mail = async (to, subject, text) => {
  await transporter
    .sendMail({
      from: "'OnCoffee' noreply@oncoffee.com.br",
      to: to,
      subject: subject,
      text: text,
    })
    .catch((err) => {
      return {
        isError: true,
        error: err,
      };
    });

  return {
    isError: false,
    error: null,
  };
};

const sendMail = (to, type, options) => {
  let subject, text;
  switch (type) {
    case "account-email-verification":
      subject = "Confirme seu email para criar sua conta no OnCoffee";
      text = `Seu código de verificação é: ${options.code}`;
      return mail(to, subject, text);
    default:
      subject = options.subject;
      text = options.text;
      return mail(to, subject, text);
  }
};

module.exports = sendMail;
