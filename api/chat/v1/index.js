const express = require('express');
const router = express.Router();
const { getChatrooms } = require('../../../utils/chatrooms');

async function getLanguages(res, next) {
    try {
        const config = {
            params: { auth_key: DEEPL_AUTH_KEY },
        }

        const response = await axios.get(DEEPL_GET_LANGUAGE_REQ, config);
        const { data } = response;

        return res.json({
            status: 'ok',
            data
        });
    }
    catch (err) {
        next(err);
    }
}

async function doTranslate(text, target_lang, res, next) {
    try {
        const config = {
            params: {
                auth_key: DEEPL_AUTH_KEY,
                text,
                target_lang,
            },
        }

        const response = await axios.get(DEEPL_TRANSLATE_REQ, config);
        const { data } = response;

        return res.json({
            status: 'ok',
            data
        });
    }
    catch (err) {
        next(err);
    }
}

router.get('/chatrooms', (req, res, next) => {
    const chatrooms = getChatrooms();
    return res.json({
        status: 'ok',
        data: chatrooms
    });
});

module.exports = router;