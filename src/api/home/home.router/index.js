const express = require('express');
const router = express.Router();
const homeController = require('../home.controller/index')

router.get('/', homeController.homePage)

module.exports = router;