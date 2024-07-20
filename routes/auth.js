const express = require('express');
const usersController = require('../controllers/usersController');
const bcryptMiddleware = require('../middleware/bcryptMiddleware');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const router = express.Router();

// The route /login uses the following middleware functions:
// 1) the usersController.login function to retrieve the user from the database
// 2) the bcryptMiddleware.comparePassword function to compare the password with the one from
// 3) the jwtMiddleware.generateToken function to generate a token
// 4) the jwtMiddleware.sendToken function to send the token to the client.
router.post("/login", usersController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

module.exports = router;