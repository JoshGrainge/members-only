const Message = require('../models/message');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const mongoose = require('mongoose');

exports.allMessages = asyncHandler(async (req, res, next) => {
	const allMessages = await Message.find().populate('user');

	res.json(allMessages)
});

exports.newMessage = asyncHandler(async (req, res, next) => {

	let newMessage = {
		user: new mongoose.Types.ObjectId(req.body.user),
		message: req.body.message,
		timestamp: Date.now(),
	};
	const message = new Message(newMessage);

	message.save();

	res.json(message);
});


