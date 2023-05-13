const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Message = require('../models/message');

exports.new_user = asyncHandler(async (req, res, next) => {
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
  });

  await user.save();

  res.json(user);
});
