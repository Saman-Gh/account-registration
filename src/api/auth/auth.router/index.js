const express = require('express')
const router = express.Router();
const authController = require('../auth.controller/index');

router.get('/signup', authController.signupPage);
router.post('/signup', authController.signupUser);

module.exports = router;
