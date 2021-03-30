const nodemailer = require('nodemailer')
const config = require('config')

const EMAIL_HOST = config.get('EMAIL_HOST')
const EMAIL_PORT = config.get('EMAIL_PORT')
const EMAIL_USERNAME = config.get('EMAIL_USERNAME')
const EMAIL_PASSWORD = config.get('EMAIL_PASSWORD')

const sendEmail = async options => {
    //1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD
        }
    })
    //2) Define the email options
    const mailOptions = {
        from: 'Gabriel',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html:
    }
    //3) Send the email
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail