const User = require('../models/user');
const Message = require('../models/message');
const asyncHandler = require('express-async-handler');

exports.users = asyncHandler(async (req, res, next) => {
	const [allUsers, allMessages] = await Promise.all([
		User.find(),
		Message.find()
		  .populate({path:'users'}),
	]);

	res.render('index', {
		users: allUsers,
		messages: allMessages,
	});
});
