const express = require('express');
const router = express.Router();
const profileController = require('../profile.controller/index')

router.put('/profile/status', profileController.changeUserStatus)
router.delete('/profile/account', profileController.deleteUserByEmail)

module.exports = router;