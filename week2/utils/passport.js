'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../models/userModel');
const fs = require('fs');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({session: false}, async (username, password, done) => {
    try {
        const user = await userModel.getUserLogin([username]);
        if (user) {
            const correctPassoword = await bcrypt.compare(password, user.password);
            if (correctPassoword) {
                delete user.password;
                return done(null, user);
            }
        }
        return done(null, false);
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