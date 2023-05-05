const nodemailer = require('nodemailer');
const {isValidObjectId} = require('mongoose');

const UserModel = require('../models/user');
const EmailVerificationTokenModel = require('../models/emailVerificationToken');

exports.createUser = async (req, res) => {
    const {username, email, password} = req.body;
    
    const oldUser = await UserModel.findOne({email});
    
    if (oldUser) return res.status(401).json({error: "This email already exists"});
    
    const newUser = new UserModel({username, email, password});
    await newUser.save();

    //Generate 6 digit OTP
    let OTP = '';

    for (let i = 0; i < 6; i++) 
        OTP += Math.trunc(Math.random() * 9);

    //Store OTP inside db
    const newToken = new EmailVerificationTokenModel({
        id: newUser._id,
        token: OTP
    });
    await newToken.save();
    
    //Send OTP to user
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "902b11fe89a06d",
          pass: "30fe1c5dc1ed3c"
        }
    });

    await transport.sendMail({
        from: 'verification@reviewapp.com',
        to: newUser.email,
        subject: 'Email Verification',
        html: `
        <p>Your verification OTP:</p>
        <h1>${OTP}</h1>
        `
    });
    
    res.status(201).json({message: 'Please verify your email. An OTP has been sent to your email account'});
};


exports.verifyMail = async (req, res) => {
    const {userId, OTP} = req.body;

    if (!isValidObjectId(userId)) return res.json({error: "Invalid User!"});

    const user = await UserModel.findById(userId);

    if (!user) return res.json({error: "No such user exists"});

    if (user.isVerified) return res.json({error: "User is already verified"});

    const token = await EmailVerificationTokenModel.findOne({id: userId});

    if (!token) return res.json({error: "message not found"});

    const isMatched = await token.compareToken(OTP);

    if (!isMatched) return res.json({error: "Invalid OTP!"});

    user.isVerified = true;
    
    await user.save();
    await EmailVerificationTokenModel.findByIdAndDelete(token._id);

    res.json({message: "User has been verified"});
};