const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  taskId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Task',
      required: true 
    },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
      required: true
     },
  comment: { 
    type: String,
     required: true
     },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
