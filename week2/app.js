'use strict';

const express = require('express');
const app = express();

const cors = require('cors');

const port = 3000;
const catRouter = require('./routes/catRoute');
const userRouter = require('./routes/userRoute');

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

app.use("/cat", catRouter);
app.use("/user", userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
