const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, locale, chatroom, chatroomOption } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

const socket = io();

//Join chat
socket.emit('joinRoom', { username, locale, chatroom });

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
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    //Get message text
    const msg = e.target.elements.msg.value;

    const config = {
        params: {
            text: msg,
            target_lang: locale
        },
    }
    const { data: { data: { translations } } } = await axios.get(`${window.location.origin}/api/deepl/v1/translate`, config);

    //Emit message to server
    socket.emit('chatMessage', translations[0].text);

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
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
    });
}
