
async function onLoadIndex() {
    console.log('index loaded')
    const {data : {data: localesArray}} = await axios.get('http://localhost:5000/api/deepl/v1/languages');
    const selectEl = document.getElementById("locale-select");
    console.log(localesArray)
    for (index in localesArray) {
        selectEl.options[selectEl.options.length] = new Option(localesArray[index].name, localesArray[index].language);
    }
    
}