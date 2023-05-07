const nodemailer = require('nodemailer');
require('dotenv').config();


var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
});

exports.sendMail = async (senderMail, receiverMail, subject, html) => {
    await transport.sendMail({
        from: 'verification@reviewapp.com',
        to: receiverMail,
        subject,
        html
    });
};

exports.generateOTP = (otpLength=6) => {
    let OTP = '';

    for (let i = 0; i < otpLength; i++) 
        OTP += Math.trunc(Math.random() * 9);

    return OTP;
};

