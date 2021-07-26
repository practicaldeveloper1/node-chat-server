const express = require('express');
const router = express.Router();

function getLanguages(res, result) {
    return res.json({
        status: 'success',
        data: 'test',
    });
}

router.get('/languages', (req, res, next) => {
    return getLanguages(res);
});

module.exports = router;