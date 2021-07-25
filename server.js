const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Run when a client connects
io.on('connection', socket => {
    console.log('New WS Connection...')

    //Welcome current user
    socket.emit('message', 'Welcome to the Chat');

    //Broadcast when a user connects
    socket.broadcast.emit('message', 'User has joined the chat');

    //Run when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user left the chat');
    });
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
