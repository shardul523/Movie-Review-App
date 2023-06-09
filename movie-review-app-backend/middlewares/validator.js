const {check, validationResult} = require('express-validator');
const {sendError} = require('../utils/helper');

exports.UserChecker = [
    check('username').trim().not().isEmpty().withMessage("Username cannot be empty"),
    check('email').normalizeEmail().isEmail().withMessage("Email is invalid"),
    check('password').trim().not().isEmpty().withMessage("Password cannot be empty")
    .isLength({min: 8, max: 20}).withMessage("Password is invalid!")
];


exports.NewPasswordChecker = [
    check('newPassword').trim().not().isEmpty().withMessage("Password cannot be empty")
    .isLength({min: 8, max: 20}).withMessage("Password is invalid!")
];


exports.SignInChecker = [this.UserChecker[1], this.UserChecker[2]]; 


exports.UserValidator = (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length) 
        return sendError(res, errors[0].msg);
    next();
}