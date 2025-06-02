const Comment = require('../models/Comment');
const Task = require('../models/Task');


exports.createComment = async (req, res) => {
  const { taskId, comment } = req.body;

  try {

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const newComment = await Comment.create({
      taskId,
      userId: req.user.id,  // assuming auth middleware sets req.user
      comment,
    });

    res.status(201).json({ comment: newComment });
  } catch (error) {
    console.error('Create Comment Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getCommentsForTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const comments = await Comment.find({ taskId }).populate('userId', 'name email');

    res.json({ comments });
  } catch (error) {
    console.error('Get Comments Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // Only the user who wrote the comment or an admin can delete
    if (comment.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete Comment Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
