const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
