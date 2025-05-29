const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'member'], default: 'member' },
  organizations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }],
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
