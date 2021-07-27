const express = require('express');
const router = express.Router();
const axios = require('axios');
const { validateTranslateReq } = require('./validator');
const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY;
const DEEPL_GET_LANGUAGE_REQ = 'https://api-free.deepl.com/v2/languages'
const DEEPL_TRANSLATE_REQ = 'https://api-free.deepl.com/v2/translate'

async function getLanguages(res, next) {
    try{
        const config = {
            params: { auth_key: DEEPL_AUTH_KEY },
        }

        const response = await axios.get(DEEPL_GET_LANGUAGE_REQ, config);
        const {data} = response;

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
            params: { auth_key: DEEPL_AUTH_KEY, 
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

router.get('/languages', (req, res, next) => {
    return getLanguages(res, next);
});

router.get('/translate', validateTranslateReq, (req, res, next) => {

    const {text, target_lang} = req.query
    return doTranslate(text, target_lang, res, next);
    
});

module.exports = router;