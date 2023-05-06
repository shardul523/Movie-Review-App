const {isValidObjectId} = require('mongoose');

const UserModel = require('../models/user');
const EmailVerificationTokenModel = require('../models/emailVerificationToken');
const {generateOTP, sendMail} = require('../utils/mail');
const {sendError} = require('../utils/helper');


const createVerificationToken = async (user) => {
    //Generate 6 digit OTP
    const OTP = generateOTP();

    //Store OTP inside db
    const newToken = new EmailVerificationTokenModel({
        id: user._id,
        token: OTP
    });
    await newToken.save();
    
    //Send OTP to user
    const mailContent = `
    <p>Your OTP for email verification is given below:</p>
    <h1>${OTP}</h1>
    `;

    await sendMail(user.email, "Email Verification", mailContent);
};


exports.createUser = async (req, res) => {
    const {username, email, password} = req.body;
    
    const oldUser = await UserModel.findOne({email});
    
    if (oldUser) return sendError(res, "This email already exists!");
    
    const newUser = new UserModel({username, email, password});
    await newUser.save();

    await createVerificationToken(newUser);
    
    res.status(201).json({message: 'Please verify your email. An OTP has been sent to your email account'});
};


exports.verifyMail = async (req, res) => {
    const {userId, OTP} = req.body;

    if (!isValidObjectId(userId)) return sendError(res, "Invalid User!");

    const user = await UserModel.findById(userId);

    if (!user) return sendError(res, "No such user exists", 404);

    if (user.isVerified) return sendError(res, "User is already verified");

    const token = await EmailVerificationTokenModel.findOne({id: userId});

    if (!token) return sendError(res, "message not found");

    const isMatched = await token.compareToken(OTP);

    if (!isMatched) return sendError(res, "Invalid OTP!");

    user.isVerified = true;
    
    await user.save();
    await EmailVerificationTokenModel.findByIdAndDelete(token._id);

    const welcomeMail = `
    <h1>Welcome to Review-Flix</h1>
    <p>We hope you continue to use our services.</p>
    `;

    sendMail(user.email, "Welcome Message", welcomeMail);

    res.json({message: "User has been verified"});
};


exports.resendEmailVerificationToken = async (req, res) => {

    const {userId} = req.body;

    const user = await UserModel.findById(userId);

    if (!user) return sendError(res, 'User does not exist');

    if (user.isVerified) return sendError(res, 'User is already Verified!');

    const token = await EmailVerificationTokenModel.findOne({id: userId});

    if (token) await EmailVerificationTokenModel.findByIdAndDelete(token._id);

    await createVerificationToken(user);

    res.json({message: "Email resent to your registered email account!"});
};