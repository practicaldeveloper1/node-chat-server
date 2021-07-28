const chatrooms = [];


function addChatroom(name, adminName) {
    const chatroom = { name, adminName };
    chatrooms.push(chatroom);
    return chatroom;
}

function getChatrooms() {
    return chatrooms;
}

function getChatroom(name) {
    return chatrooms.find(chatroom => chatroom.name === name)
}

module.exports = {
    addChatroom,
    getChatrooms,
    getChatroom
}