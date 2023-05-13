const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Message = require('../models/message');
const mongoose = require('mongoose');

exports.user_detail = asyncHandler(async (req, res, next) => {
  const userObjectId = new mongoose.Types.ObjectId(req.params._id);

  const user = await User.findById(userObjectId);

  res.json(user);
});

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

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) {
    if (user.password !== req.body.password) {
      return res.status(400).send({
        message: 'Incorrect password',
      });
    }

    res.sendStatus(200);
  } else {
    return res.status(400).send({
      message: 'Username does not exist',
    });
  }
});
