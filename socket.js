const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { addUser, getUser, getUsers, removeUser } = require('./utils/users');
const { addChatroom, getChatroom } = require('./utils/chatrooms');

const botName = 'Chat Bot';

module.exports.listen = function (server) {

    const io = socketio(server);

    //Run when a client connects
    io.on('connection', socket => {
        console.log('New WS Connection...')

        socket.on('joinRoom', ({ username, locale, chatroom, disableMessages }) => {

            let chatroomInfo = getChatroom(chatroom);

            if (!chatroomInfo) {
                chatroomInfo = addChatroom(chatroom, username, disableMessages)
            }

            const user = addUser(socket.id, username, locale, chatroom);

            //join the given room
            socket.join(user.chatroom);

            //Welcome current user
            socket.emit('message', formatMessage(botName, 'Welcome to the Chat'));

            //Broadcast when a user connects
            socket.broadcast.to(user.chatroom).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

            console.log(getUsers(chatroom));
            //send users info
            io.to(user.chatroom).emit('roomUsers',
                getUsers(chatroom)
            );

            //Run when client disconnects
            socket.on('disconnect', () => {
                const user = removeUser(socket.id);
                if (user) {
                    io.to(user.chatroom).emit('message', formatMessage(botName, `${user.username} left the chat`));
                }

                //send users info
                io.emit('roomUsers',
                    getUsers(chatroom)
                );

            });

            //Listen for chatMessage
            socket.on('chatMessage', msg => {
                const user = getUser(socket.id);
                if (user.username === chatroomInfo.adminName || chatroomInfo.disableMessages !== 'on') {
                    io.to(user.chatroom).emit('message', formatMessage(user.username, msg));
                }
                else {
                    //Notice current user that messages are disabled
                    socket.emit('message', formatMessage(botName, 'Only admin can send messages'));

                }
            })
        })
    })

}