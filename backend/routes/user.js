const express = require('express')

const {UserChecker, UserValidator} = require('../middlewares/validator');
const {createUser, verifyMail, resendEmailVerificationToken} = require('../controllers/user.js');

const router = express.Router();

router.post('/create', UserChecker, UserValidator, createUser);
router.post('/verify-email', verifyMail);
router.post('/resend-verification-email', resendEmailVerificationToken);

module.exports = router;