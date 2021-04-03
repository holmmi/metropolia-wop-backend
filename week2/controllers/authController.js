'use strict';

const jwt = require('jsonwebtoken');
const passport = require('../utils/passport');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const privateKey = fs.readFileSync(__dirname + "/../secrets/jwt.key");

const register = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        await userModel.addUser([req.body.name, req.body.username, hash]);
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: "Internal Server Error"});
    }
};

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
            res.json({token: token, user: user});
        });
    })(req, res, next);
};

const logout = (req, res) => {
    req.logout();
    res.json({message: 'logout'});
};

module.exports = {
    register,
    login,
    logout
};