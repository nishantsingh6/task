const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
  name: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, 
  ref: 'User' },
});

module.exports = mongoose.model('Organization', orgSchema);
