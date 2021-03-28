'use strict';

const express = require('express');
const session = require('express-session');
const passport = require('./utils/passport');

const app = express();
const port = 3000;

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

// Enable sessions
app.use(session({
  secret: "who knows", maxAge: 1000 * 60 * 60,
  resave: false,
  saveUninitialized: true
}));

// Passport initilization
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './views');
app.set('view engine', 'pug');

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/form');
  }
};

app.get('/', (req, res) => {
  res.render('home');
});

app.get("/setCookie/:clr", (req, res) => {
  res.cookie("color", req.params.clr, {maxAge: 1000 * 60 * 60}).send("OK");
});

app.get("/deleteCookie", (req, res) => {
  res.clearCookie("color").send("OK");
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.get("/secret", loggedIn, (req, res) => {
  res.render("secret");
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/form"
}));

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));