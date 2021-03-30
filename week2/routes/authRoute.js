'use strict';

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userValidator = require('../validators/userValidator');

router.post("/register", userValidator, authController.register, authController.login);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;