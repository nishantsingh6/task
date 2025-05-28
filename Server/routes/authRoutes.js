const express = require('express');
const router = express.Router();

const{signUp, login, forgotPassword, resetPassword}  = require("../controllers/authController");
const authMiddleware = require('../middlewares/authMiddleware');

// Route for user registration
router.post('/signup', signUp);
router.post('/login', login);
router.post('/forgot-password',  forgotPassword);
router.post('/reset-password', resetPassword);


module.exports = router;