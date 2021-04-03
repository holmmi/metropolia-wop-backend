'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const catRouter = require('./routes/catRoute');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');
const passport = require('./utils/passport');

// Enable CORS
app.use(cors());

app.use(passport.initialize());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

// Parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static("./public/"));

// Serve images from a local thumbnails folder
app.use("/thumbnails", express.static("./thumbnails/"));

app.use("/cat", catRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

if (process.env.NODE_ENV === "production") {
    require("./production")(process.env.HTTP_PORT, app);
} else {
    require("./development")(process.env.HTTP_PORT, process.env.HTTPS_PORT, app);
}