const nodemailer = require("nodemailer");
const config = require("config");

const EMAIL_HOST = config.get("EMAIL_HOST");
const EMAIL_PORT = config.get("EMAIL_PORT");
const SENDGRID_USERNAME = config.get("SENDGRID_USERNAME");
const SENDGRID_PASSWORD = config.get("SENDGRID_PASSWORD");
const EMAIL_FROM = config.get("EMAIL_FROM");

const sendEmail = async (options) => {
  //1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: SENDGRID_USERNAME,
      pass: SENDGRID_PASSWORD,
    },
  });
  //2) Define the email options
  const mailOptions = {
    from: `Reco <${EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  //3) Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
