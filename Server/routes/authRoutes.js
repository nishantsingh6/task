const express = require('express');
const router = express.Router();
const User = require('../models/User');

const{signUp, login, forgotPassword, resetPassword}  = require("../controllers/authController");
const {authenticate} = require('../middlewares/authMiddleware');


// Route for user registration
router.get('/getUser', authenticate, async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      console.log("No users found");
    } else {
      console.log("Fetched users:", users);
    }
   return  res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
   return  res.status(500).json({ message: 'Failed to fetch users' });
  }
});


router.post('/signup', signUp);
router.post('/login', login);
router.post('/forgot-password',  forgotPassword);
router.post('/reset-password', resetPassword);




module.exports = router;