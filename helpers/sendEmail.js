const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const {SENDGRID_API_KEY} = process.env
sgMail.setApiKey(SENDGRID_API_KEY)

const sendEmail = async({to,subject,html}) => {
    const mail = {
        from: 'aloxnesir@gmail.com',
        to,
        subject,
        html
    }
    sgMail.send(mail)
}

module.exports = sendEmail