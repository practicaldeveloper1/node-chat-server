const chatrooms = [];

// add a new chatroom
function addChatroom(name, adminID, disableMessages) {
    const chatroom = { name, adminID, disableMessages };
    chatrooms.push(chatroom);
    return chatroom;
}

//Get Chatrooms
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