const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { addUser, getUser, getUsers, removeUser } = require('./utils/users');

const botName = 'Chat Bot';

module.exports.listen = function (server) {

    const io = socketio(server);

    //Run when a client connects
    io.on('connection', socket => {
        console.log('New WS Connection...')

        socket.on('joinRoom', ({ username, locale }) => {
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
                if (user) {
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

}