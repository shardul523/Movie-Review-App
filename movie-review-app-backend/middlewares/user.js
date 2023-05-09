const {isValidObjectId} = require('mongoose')

const {sendError} = require('../utils/helper');
const PasswordResetTokenModel = require('../models/passwordResetToken')

exports.verifyPasswordResetToken = async (req, res, next) => {
    const {userId, token} = req.body;

    if (!token.trim() || !isValidObjectId(userId)) return sendError("Unauthorized access! Invalid request");

    const resetToken = await PasswordResetTokenModel.findOne({owner: userId});

    if (!resetToken) return sendError("Unauthorized access! No such token exists");

    const isMatched = await resetToken.compareToken(token);

    if (!isMatched) return sendError("Unauthorized access! Invalid token");

    req.resetTokenId = resetToken._id;

    next();
};