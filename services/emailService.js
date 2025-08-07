const nodemailer = require('nodemailer');
const config = require('../config/index');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

async function sendEmailWithAttachment({ to, subject, html, attachments }) {
  const mailOptions = {
    from: config.EMAIL_USER,
    to,
    subject,
    html,
    attachments,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmailWithAttachment };
