const express = require('express');
const router = express.Router();
const axios = require('axios');
const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY;
const DEEPL_GET_LANGUAGE_REQ = 'https://api-free.deepl.com/v2/languages'

async function getLanguages(res, result) {
    try {
        console.log('works');
        let config = {
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
        console.log(err);
        return res.json({
           status: 'error'
        });
    }
}

router.get('/languages', (req, res, next) => {
    return getLanguages(res);
});

module.exports = router;