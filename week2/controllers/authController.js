'use strict';

const jwt = require('jsonwebtoken');
const passport = require('../utils/passport');
const fs = require('fs');

const privateKey = fs.readFileSync(__dirname + "/../secrets/jwt.key");

const login = (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) {
            return res.status(500).json({error: "Internal Server Error"});
        }
        if (!user) {
            return res.status(401).json({error: "Invalid email or password"});
        }
        req.login(user, (err) => {
            const token = jwt.sign({userId: user.user_id}, privateKey, {issuer: "Metropolia", algorithm: "RS256", expiresIn: "1d"});
            res.json({token: token});
        });
    })(req, res, next);
};

module.exports = {
  login
};