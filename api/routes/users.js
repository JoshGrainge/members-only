const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/* GET user detail */
router.get('/:id', userController.user_detail);

/* POST sign up information */
router.post('/signup', userController.new_user);

/* POST log in information */
router.post('/login', userController.login);

module.exports = router;
