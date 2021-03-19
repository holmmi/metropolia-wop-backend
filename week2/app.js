'use strict';

const express = require('express');
const app = express();

const cors = require('cors');

const port = 3000;
const catRouter = require('./routes/catRoute');
const userRouter = require('./routes/userRoute');

// Enable CORS
app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));
// Parse JSON bodies
app.use(express.json());

// Serve images from a local uploads folder
app.use("/image", express.static("./uploads/"));

app.use("/cat", catRouter);
app.use("/user", userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));