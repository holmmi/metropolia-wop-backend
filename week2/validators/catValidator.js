'use strict';

const { check, validationResult } = require('express-validator');

const catPostValidator = [
    check("name")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Name cannot be empty")
        .bail(),
    check("age")
        .notEmpty()
        .withMessage("Age cannot be empty")
        .bail()
        .isNumeric()
        .withMessage("Age must be given in numbers")
        .bail(),
    check("weight")
        .notEmpty()
        .isNumeric()
        .withMessage("Weight must be given in numbers")
        .bail(),
    check("owner")
        .notEmpty()
        .withMessage("Owner must be given")
        .bail(),
    check("cat")
        .custom((input, {req}) => {
            const allowedMimes = ["image/jpeg", "image/png", "image/gif"];
            return allowedMimes.includes(req.file.mimetype);
        })
        .withMessage("File must be in PNG, GIF or JPG format")
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

const catPutValidator = [
    check("name")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Name cannot be empty")
        .bail(),
    check("age")
        .notEmpty()
        .isNumeric()
        .withMessage("Age must be given in numbers")
        .bail(),
    check("weight")
        .notEmpty()
        .isNumeric()
        .withMessage("Weight must be given in numbers")
        .bail(),
    check("owner")
        .notEmpty()
        .withMessage("Owner must be given")
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = {
    catPostValidator,
    catPutValidator
}