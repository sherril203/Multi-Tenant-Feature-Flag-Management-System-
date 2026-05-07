const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');

router.post('/signup', userControllers.UserRegister);
router.post('/login', userControllers.UserLogin);

module.exports = router;