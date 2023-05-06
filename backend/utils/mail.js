const nodemailer = require('nodemailer');


var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "902b11fe89a06d",
      pass: "30fe1c5dc1ed3c"
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

