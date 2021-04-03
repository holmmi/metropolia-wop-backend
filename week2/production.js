'use strict';

const http = require('http');

module.exports = (httpPort, app) => {
    // Listen the server in the specified port (environment variable "HTTP_PORT" defined in ".env" file)
    // Web server already handles the redirection from http to https.
    http.createServer(app).listen(httpPort);
};