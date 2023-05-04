const {check, validationResult} = require('express-validator');

exports.UserChecker = [
    check('username').trim().not().isEmpty().withMessage("Username cannot be empty"),
    check('email').normalizeEmail().isEmail().withMessage("Email is invalid"),
    check('password').trim().not().isEmpty().withMessage("Password cannot be empty")
    .isLength({min: 8, max: 20}).withMessage("Password is invalid!")
];


exports.UserValidator = (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length) 
        return res.json({error: errors[0].msg});
    next();
}