const users = [];

//User join a chat
function addUser(id, username, locale, chatroom) {
    const user = { id, username, locale, chatroom };
    users.push(user);
    return user;
}

//Join leaves a chat
function removeUser(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

//Get Users
function getUsers(chatroom) {
    return users.filter(user => user.chatroom === chatroom);;
}

function getUser(id) {
    return users.find(user => user.id === id)
}

module.exports = {
    addUser,
    getUser,
    getUsers,
    removeUser,
}