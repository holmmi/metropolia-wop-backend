'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../models/userModel');
const fs = require('fs');

passport.use(new LocalStrategy(
    {
        session: false,
        usernameField: "email",
        passwordField: "password"
    }, async (username, password, done) => {
    try {
        const user = await userModel.getUserLogin([username, password]);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        console.error(error);
        return done(error, false);
    }
}));

const jwtOptions = {
    secretOrKey: fs.readFileSync(__dirname + "/../secrets/jwt.pem"),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer: "Metropolia",
    algorithms: ["RS256"]
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    return done(null, jwtPayload.userId);
}));

module.exports = passport;