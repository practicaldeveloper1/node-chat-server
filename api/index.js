const express = require('express');
const router = express.Router();

router.use('/api/deepl/v1/', require('./deepl/v1/'));

module.exports = router;