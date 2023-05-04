const express = require('express')
const {UserChecker, UserValidator} = require('../middlewares/validator');

const {createUser} = require('../controllers/user.js');

const router = express.Router();

router.post('/create', UserChecker, UserValidator, createUser);

module.exports = router;