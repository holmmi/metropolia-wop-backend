'use strict';

const express = require('express');
const router = express.Router();
const userValidator = require('../validators/userValidator');
const userController = require('../controllers/userController');

router.route("/")
.get(userController.user_get_list)
.post(userValidator, userController.user_create_post);

router.route("/:id").get(userController.user_get);

module.exports = router;