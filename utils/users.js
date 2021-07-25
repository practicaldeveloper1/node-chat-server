const users = [];

// Join user to chat
function userJoin(id, username, locale) {
    const user = {id, username, locale};
    users.push(user);
    return user;    
}

function getUser(id) {
    return users.find(user => user.id === id)
}

module.exports = {
    userJoin,
    getUser
}