const nodemailer = require("nodemailer");
const config = require("config");
const { htmlToText } = require("html-to-text");

const EMAIL_HOST = config.get("EMAIL_HOST");
const EMAIL_PORT = config.get("EMAIL_PORT");
const EMAIL_USERNAME = config.get("EMAIL_USERNAME");
const EMAIL_PASSWORD = config.get("EMAIL_PASSWORD");
const EMAIL_FROM = config.get("EMAIL_FROM");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `Reco ${EMAIL_FROM}`;
  }

  // Create a transporter
  newTransport() {
    return nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  // Send the email
  async send(template, subject) {
    //1) Render HMTL based on a template
    //2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: htmlToText.fromString(html),
      html,
    };
    //3) Create a transport and send the email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Reco Family!");
  }
};

// const sendEmail = async options => {
//     //1) Create a transporter
//     const transporter = nodemailer.createTransport({
//         host: EMAIL_HOST,
//         port: EMAIL_PORT,
//         auth: {
//             user: EMAIL_USERNAME,
//             pass: EMAIL_PASSWORD
//         }
//     })
//     //2) Define the email options
//     const mailOptions = {
//         from: 'Gabriel',
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//         // html:
//     }
//     //3) Send the email
//     await transporter.sendMail(mailOptions)
// }

// module.exports = sendEmail;
