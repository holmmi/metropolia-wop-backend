'use strict';

const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');

const multer = require('multer');
const upload = multer({dest: "./uploads/"});

router.route("/")
.get(catController.cat_get_list)
.post(upload.single("cat"), (req, res) => {
    res.json("OK");
});

router.route("/:id").get(catController.cat_get);

module.exports = router;