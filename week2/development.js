'use strict';

const http = require('http');
const https = require('https');
const fs = require('fs');

module.exports = (httpPort, httpsPort, app) => {
    https.createServer({key: fs.readFileSync("secrets/server.key"), cert: fs.readFileSync("secrets/server.crt")}, app)
        .listen(httpsPort);
    http.createServer((req, res) => {
        res.writeHead(301, {Location: `https://localhost:${httpsPort}${req.url}`});
        res.end();
    }).listen(httpPort);
};