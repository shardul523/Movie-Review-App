const express = require('express')

const {UserChecker, UserValidator, NewPasswordChecker, SignInChecker} = require('../middlewares/validator');
const {verifyPasswordResetToken} = require('../middlewares/user')
const {createUser, verifyMail, resendEmailVerificationToken, resetPassword, 
    sendPasswordResetTokenStatus, updatePassword, signIn} = require('../controllers/user.js');

const router = express.Router();

router.post('/sign-in', SignInChecker, UserValidator, signIn);
router.post('/create', UserChecker, UserValidator, createUser);
router.post('/verify-email', verifyMail);
router.post('/resend-verification-email', resendEmailVerificationToken);
router.post('/reset-password', resetPassword);
router.post('/verify-password-reset-token', verifyPasswordResetToken, sendPasswordResetTokenStatus);
router.post('/update-password', NewPasswordChecker, UserValidator, updatePassword)

module.exports = router;