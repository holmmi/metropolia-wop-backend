'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser((id, done) => {
    done(null, userModel.getUserById(id));
});

passport.use(new LocalStrategy(
    (username, password, done) => {
        const user = userModel.getUserLogin(username, password);
        if (user != null) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
));

module.exports = passport;