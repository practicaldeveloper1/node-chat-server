const users = [];

// Join user to chat
function addUser(id, username, locale) {
    const user = {id, username, locale};
    users.push(user);
    return user;    
}

// Join leaves chat
function removeUser(id) {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1);
    }
}

//Get Users
function getUsers() {
    return users;

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