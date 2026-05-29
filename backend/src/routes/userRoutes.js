const express = require('express');
const getUsername = require('../controllers/userController')
const middleware = require('../middleware/middleware');

const router = express.Router();

router.get('/user', middleware, getUsername);

module.exports = router;