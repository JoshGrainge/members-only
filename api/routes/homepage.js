var express = require('express');
var router = express.Router();

const messageController = require('../controllers/messageController');

/* GET home page. */
router.get('/', messageController.allMessages);

router.post('/message/new', messageController.newMessage);

module.exports = router;
