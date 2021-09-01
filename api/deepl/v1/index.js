const express = require('express');
const router = express.Router();
const { validateTranslateReq } = require('./validator');
const { fetchLanguages, translateText } = require('../../../services/deepl');

router.get('/languages', async (req, res, next) => {
    try {
        const languageArray = await fetchLanguages();
        return res.json({
            status: 'ok',
            data: languageArray
        });
    }
    catch (err) {
        next(err);
    }
});

router.get('/translate', validateTranslateReq, async (req, res, next) => {
    try {
        const { text, target_lang } = req.query
        const translatedText = await translateText(text, target_lang);
        console.log(translatedText);
        return res.json({
            status: 'ok',
            data: translatedText
        });
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;