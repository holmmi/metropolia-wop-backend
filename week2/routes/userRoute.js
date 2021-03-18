'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route("/")
.get(userController.user_get_list);

router.route("/:id").get(userController.user_get);

module.exports = router;