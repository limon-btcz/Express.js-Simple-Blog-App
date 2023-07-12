/*
// Title: Todo routes
// Description: Todo all routes define here.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/5/2023
*/

const express = require('express');
const router = express.Router();

// dependencies
const authController = require('../../controller/authController');

// signup
router.post('/signup', authController.signup);

// singin
router.post('/signin', authController.singin);

module.exports = router;