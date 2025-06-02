const Task = require('../models/Task');

// Tasks completed per day/week
exports.getTaskCompletionAnalytics = async (req, res) => {
  try {
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    res.json({ completedTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Member productivity
exports.getMemberProductivity = async (req, res) => {
  try {
    const memberProductivity = await Task.aggregate([
      { $match: { assignedTo: mongoose.Types.ObjectId(req.params.userId) } },
      { $group: { _id: '$assignedTo', completedTasks: { $sum: 1 } } },
    ]);
    res.json({ memberProductivity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
