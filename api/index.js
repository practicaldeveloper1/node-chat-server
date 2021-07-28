const express = require('express');
const router = express.Router();

router.use('/api/deepl/v1/', require('./deepl/v1/'));
router.use('/api/chat/v1/', require('./chat/v1/'));


module.exports = router;