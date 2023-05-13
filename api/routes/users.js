const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/* GET user detail */
router.get('/:id', userController.user_detail);

module.exports = router;
