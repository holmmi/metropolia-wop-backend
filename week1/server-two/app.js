'use strict';

const express = require('express');
const pug = require('pug');

const app = express();
const port = 3000;

app.use(express.static("./public"));

const compiledFunction = pug.compileFile('./views/index.html');

app.get('/', (req, res) => {
  res.send(compiledFunction())
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/catinfo', (req, res) => {
    const cat = {
      name: 'Frank',
      age: 6,
      weight: 5,
    };
    res.json(cat);
});