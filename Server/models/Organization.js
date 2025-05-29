const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  users: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['admin', 'manager', 'member'], default: 'member' }
  }]
}, { timestamps: true });

const Organization = mongoose.model('Organization', orgSchema);
module.exports = Organization;
