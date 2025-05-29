const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
     type: String,
     required: true
     },
  description: { type: String },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId,
     ref: 'User' }],
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: Date },
  status: { type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
