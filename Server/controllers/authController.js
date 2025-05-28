const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require("../utils/sendEmail");

require('dotenv').config();

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error signing up",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Create JWT token
    const payload = {
      id: existingUser._id,
      role: existingUser.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

const crypto = require('crypto');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Create reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    const resetLink = `https://task-chi-nine.vercel.app/reset-password?token=${resetToken}`;

  await sendEmail(user.email, 'Reset Your Password', `<p>Click here to reset: <a href="${resetLink}">${resetLink}</a></p>`);


    return res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error sending reset email',
      error: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  const token = req.query.token;
  const { newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: 'Token and new password are required' });
    }



    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    // Find the user with matching token and check expiry
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    // 

    if (!user) {
      return res.status(404).json({ success: false, message: 'Not or expired token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password has been reset successfully',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while resetting password',
      error: error.message,
    });
  }
};


 





