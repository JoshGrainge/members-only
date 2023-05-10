const Message = require('../models/message');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');


exports.allMessages = asyncHandler(async (req, res, next) => {
	const allMessages = await Message.find().populate('user');

	res.json(allMessages)
});




