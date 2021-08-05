require('dotenv').config()
const path = require('path');
const http = require('http');
const express = require('express');
const router = require('./api');
const {
    clientErrorHandler,
    serverErrorHandler,
    notFoundErrorHandler,
} = require('./api/error');

const app = express();
const server = http.createServer(app);

const io = require('./socket.js').listen(server);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use(router);
app.use(clientErrorHandler);
app.use(serverErrorHandler);
app.use(notFoundErrorHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));