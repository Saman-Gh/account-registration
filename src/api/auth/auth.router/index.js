const express = require('express')
const router = express.Router();
const authController = require('../auth.controller/index');

router.get('/signup', authController.signupPage);
router.post('/signup', authController.signupUser);

router.get('/login', authController.loginPage)
router.post('/login', authController.loginUser)

module.exports = router;
