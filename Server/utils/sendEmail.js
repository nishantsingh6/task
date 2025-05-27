const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: 'Nishant Singh',
      to: email,
      subject: title,
      html: body,
    });

    console.log('Email sent:', info.messageId);
    return { success: true, info };
  } catch (error) {
    console.error('Email error:', error.message);
    return {
      success: false,
      message: 'Failed to send email',
      error: error.message,
    };
  }
};

module.exports = sendEmail;
