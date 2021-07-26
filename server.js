require('dotenv').config()
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {addUser, getUser, getUsers, removeUser} = require('./utils/users');
const router = require('./api');
const {
    serverErrorHandler,
    notFoundErrorHandler,
} = require('./api/error');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 

app.use(router);
app.use(serverErrorHandler);
app.use(notFoundErrorHandler);

const botName = 'Chat Bot';

//Run when a client connects
io.on('connection', socket => {
    console.log('New WS Connection...')

    socket.on('joinRoom', ({username, locale}) => {
        const user = addUser(socket.id, username, locale);

        //Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to the Chat'));

        //Broadcast when a user connects
        socket.broadcast.emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        console.log(getUsers());
        //send users info
        io.emit('roomUsers',
            getUsers() 
         );

        //Run when client disconnects
        socket.on('disconnect', () => {
            const user = removeUser(socket.id);
            if(user) {
                io.emit('message', formatMessage(botName, `${user.username} left the chat`));
            }

            //send users info
            io.emit('roomUsers',
                getUsers() 
            );

        });

        //Listen for chatMessage
        socket.on('chatMessage', msg => {
            const user = getUser(socket.id);
            io.emit('message', formatMessage(user.username, msg));
        })
    })
  
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
