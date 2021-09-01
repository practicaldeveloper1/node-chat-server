const axios = require('axios');
const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY;
const DEEPL_GET_LANGUAGE_REQ = 'https://api-free.deepl.com/v2/languages'
const DEEPL_TRANSLATE_REQ = 'https://api-free.deepl.com/v2/translate'

async function fetchLanguages() {

    const config = {
        params: { auth_key: DEEPL_AUTH_KEY },
    }

    const response = await axios.get(DEEPL_GET_LANGUAGE_REQ, config);
    const { data } = response;
    return data;
}

async function translateText(text, target_lang) {

    const config = {
        params: {
            auth_key: DEEPL_AUTH_KEY,
            text,
            target_lang,
        },
    }

    const response = await axios.get(DEEPL_TRANSLATE_REQ, config);
    const { data } = response;
    return data.translations[0].text;
}

module.exports = {
    fetchLanguages,
    translateText
}