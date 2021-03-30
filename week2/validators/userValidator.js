'use strict';

const {check, validationResult} = require('express-validator');

const userValidator = [
    check("name")
        .trim()
        .escape()
        .isLength({min: 3})
        .withMessage("Name must be at 3 three characters")
        .bail(),
    check("username")
        .normalizeEmail()
        .isEmail()
        .withMessage("Make sure you have entered email")
        .bail(),
    check("password")
        .matches("^(?=.*[A-Z]).{8,}$")
        .withMessage("Password must contain 8 characters and at least 1 uppercase letter")
        .escape()
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = userValidator;