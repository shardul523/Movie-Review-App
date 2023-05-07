const {isValidObjectId} = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserModel = require('../models/user');
const EmailVerificationTokenModel = require('../models/emailVerificationToken');
const PasswordResetTokenModel = require('../models/passwordResetToken');
const {generateOTP, sendMail} = require('../utils/mail');
const {sendError, generateRandomBytes} = require('../utils/helper');


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

    await sendMail("verification@reviewapp.com", user.email, "Email Verification", mailContent);
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

    sendMail("verification@reviewapp.com", user.email, "Welcome Message", welcomeMail);

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


exports.resetPassword = async (req, res) => {
    
    const {email} = req.body;

    if (!email) return sendError(res, "Email is missing");

    const user = await UserModel.findOne({email});

    if (!user) return sendError(res, "User not found!", 404);

    const resetToken = await PasswordResetTokenModel.findOne({owner: user._id});

    if (resetToken) return sendError(res, "Only one password reset OTP can be sent within an error!");

    const token = await generateRandomBytes();

    const newResetToken = new PasswordResetTokenModel({
        owner: user._id,
        token
    });

    await newResetToken.save();

    const resetPasswordURL = `http://localhost:3000/reset-password?token=${token}&id=${newResetToken.owner}`;

    const resetMail = `
    <h1>Reset Password</h1>
    <p>Click the link given below to reset your password:</p>
    <a href=${resetPasswordURL}>Click Here</a>
    `;

    sendMail("security@reviewapp.com", email, "Reset Password", resetMail);

    res.json({message: "Password Reset Mail Sent!"});
};


exports.sendPasswordResetTokenStatus = (req, res) => res.json({valid: true});


exports.updatePassword = async (req, res) => {

    const {userId, newPassword} = req.body;

    const user = await UserModel.findById(userId);

    const isMatched = await user.comparePassword(newPassword);

    if (isMatched) return sendError(res, "New Password must not be the same as old password");

    user.password = newPassword;
    await user.save();

    // console.log("Reset Token Id:", req.resetTokenId);

    await PasswordResetTokenModel.findOneAndDelete({owner: user._id});

    passwordResetMail = `
    <h1>Congratulations!</h1>
    <p>Your password has been reset successfully</p>
    `;

    await sendMail("security@reviewapp.com", user.email, "Password Reset Successful", passwordResetMail);

    res.json({message: "Password Reset Successfully!"});
};


exports.signIn = async (req, res) => {

    const {email, password} = req.body;

    const user = await UserModel.findOne({email});

    if (!user) return sendError(res, "Email/Password Mismatch");

    const isMatched = await user.comparePassword(password);

    if (!isMatched) return sendError(res, "Email/Password Mismatch");

    const token = jwt.sign({id: user._id}, process.env.ACCESS_SECRET_KEY);

    res.json({...user, token});
};