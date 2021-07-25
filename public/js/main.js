const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

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
    p.innerText = 'username';
    p.innerHTML += `<span> 11.00 AM </span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}