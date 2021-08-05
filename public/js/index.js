
async function onPageLoad() {

    //refresh page when pressing back button on browser
    if (event.persisted) {
        window.location.reload();
    }
    const { data: { data: localesArray } } = await axios.get(`${window.location.origin}/api/deepl/v1/languages`);
    const localeSelectEl = document.getElementById("locale-select");

    for (index in localesArray) {
        localeSelectEl.options[localeSelectEl.options.length] = new Option(localesArray[index].name, localesArray[index].language);
    }
}

async function getChatrooms() {
    const chatroomSelectEl = document.getElementById("chatroom-select");
    chatroomSelectEl.innerHTML = "";
    const { data: { data: chatroomsArray } } = await axios.get(`${window.location.origin}/api/chat/v1/chatrooms`);
    for (index in chatroomsArray) {
        chatroomSelectEl.options[chatroomSelectEl.options.length] = new Option(chatroomsArray[index].name, chatroomsArray[index].name);
    }
}

async function submitForm() {

    //remove new chatroom values when join existing chatroom
    if (!document.getElementById('chatroom-new-option').checked) {
        document.getElementById('chatroom-new-input').removeAttribute('name');
        document.getElementById('chatroom-disable-messages').removeAttribute('name');
    }

    else {
        //check if chatroom exists
        const chatroomName = document.getElementById('chatroom-new-input').value
        const { data: { data } } = await axios.get(`${window.location.origin}/api/chat/v1/chatrooms/${chatroomName}`);
        console.log(data);
        if (Object.keys(data).length !== 0) {
            alert(`chatroom ${chatroomName} already exists!`);
            return false;
        }
    }

    //no need to get new or existing chatroom property
    document.getElementById('chatroom-new-option').removeAttribute('name');
    document.getElementById('chatroom-existing-option').removeAttribute('name');

    document.getElementById('join-form').submit();

}


document.body.addEventListener('change', e => {
    const target = e.target;
    const chatroomExistingDiv = document.getElementById("chatroom-existing-div");
    const chatroomNewDiv = document.getElementById("chatroom-new-div");
    switch (target.id) {
        case 'chatroom-new-option':
            chatroomExistingDiv.classList.add("hidden");
            chatroomNewDiv.classList.remove("hidden");
            //require new chatroom name
            document.getElementById('chatroom-new-input').required = true;
            break;
        case 'chatroom-existing-option':
            //not require new chatroom name
            document.getElementById('chatroom-new-input').required = false;
            chatroomNewDiv.classList.add("hidden");
            chatroomExistingDiv.classList.remove("hidden");
            getChatrooms();
        default:
            break;
    }
});