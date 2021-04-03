'use strict';

const express = require('express');
const router = express.Router();
const catValidator = require('../validators/catValidator');
const catController = require('../controllers/catController');
const passport = require('../utils/passport');
const multer = require('multer');
const upload = multer({dest: "./thumbnails/"});

router.use(passport.authenticate('jwt', {session: false}));

router.route("/")
    .get(catController.cat_get_list)
    .post(upload.single("cat"), catValidator.catPostValidator, catController.cat_create_post)
    .put(catValidator.catPutValidator, catController.cat_update_put);

router.route("/:id")
    .get(catController.cat_get)
    .delete(catController.cat_delete);

module.exports = router;