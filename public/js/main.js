const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, locale } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

const socket = io();

//Join chat
socket.emit('joinRoom', {username, locale});

//Get Users
socket.on('roomUsers', username => {
    outputUsers(username);
})

socket.on('message', message => {
    outputMessage(message);

    //Scroll down 
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    //Get message text
    const msg = e.target.elements.msg.value;
    
    //Emit message to server
    socket.emit('chatMessage', msg);

    //Clear inputs
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span> ${message.time} </span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}

// Add users to DOM
function outputUsers(users) {
    console.log(users);
    userList.innerHTML = '';
    users.forEach( user => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
    });
}