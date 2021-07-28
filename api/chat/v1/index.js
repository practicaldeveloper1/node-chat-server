const express = require('express');
const router = express.Router();
const { getChatrooms, getChatroom } = require('../../../utils/chatrooms');

router.get('/chatrooms', (req, res, next) => {
    const chatrooms = getChatrooms();
    return res.json({
        status: 'ok',
        data: chatrooms
    });
});

router.get('/chatrooms/:chatroom', (req, res, next) => {
    console.log(req.params);
    const { chatroom: requestedChatroom } = req.params;
    const chatroom = getChatroom(requestedChatroom);

    return res.json({
        status: 'ok',
        data: chatroom
    });
});

module.exports = router;