
async function onLoadIndex() {
    const { data: { data: localesArray } } = await axios.get(`${window.location.origin}/api/deepl/v1/languages`);
    const selectEl = document.getElementById("locale-select");
    for (index in localesArray) {
        selectEl.options[selectEl.options.length] = new Option(localesArray[index].name, localesArray[index].language);
    }
}

document.body.addEventListener('change', e => {
    const target = e.target;
    const chatroomExistingDiv = document.getElementById("chatroom-existing-div");
    const chatroomNewDiv = document.getElementById("chatroom-new-div");
    switch (target.id) {
        case 'chatroom-new-option':
            chatroomExistingDiv.classList.add("hidden");
            chatroomNewDiv.classList.remove("hidden");
            break;
        case 'chatroom-existing-option':
            chatroomNewDiv.classList.add("hidden");
            chatroomExistingDiv.classList.remove("hidden");
        default:
            break;
    }
});