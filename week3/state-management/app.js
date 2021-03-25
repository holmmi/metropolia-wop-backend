'use strict';

const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

const username = 'foo';
const password = 'bar';

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

// Enable sessions
app.use(session({
  secret: "who knows", maxAge: 1000 * 60 * 60,
  resave: false,
  saveUninitialized: true
}));

app.set('views', './views');
app.set('view engine', 'pug');

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

app.get("/secret", (req, res) => {
  if (req.session.logged === true) {
    res.render("secret");
  } else {
    res.redirect("/form");
  }
});

app.post("/login", (req, res) => {
  if (req.body.username === username && req.body.password === password) {
    req.session.logged = true;
    res.redirect("/secret");
  } else {
    req.session.logged = false;
    res.redirect("/form");
  } 
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));