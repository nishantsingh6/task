const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');

// Get all tasks (optionally filter by project)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo');
    return res.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a task 
exports.createTask = async (req, res) => {
  const { title, description, assignedTo, priority, dueDate, projectId, status } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const user = await User.findById(assignedTo);
    if (!user) return res.status(400).json({ message: 'Assigned user not found' });

    if (!project.members.includes(assignedTo)) {
      return res.status(400).json({ message: 'User is not part of the project' });
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority' });
    }

    if (new Date(dueDate) < new Date()) {
      return res.status(400).json({ message: 'Due date cannot be in the past' });
    }

    const task = new Task({
      title,
      description,
      assignedTo,
      priority,
      dueDate,
      project: projectId,
      status: status || "todo"
    });

    await task.save();
    project.tasks.push(task._id);
    await project.save();

    return res.status(201).json({ task });
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  const { title, description, assignedTo, priority, dueDate, status } = req.body;

  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (!user) return res.status(400).json({ message: 'Assigned user not found' });
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority' });
    }

    if (dueDate && new Date(dueDate) < new Date()) {
      return res.status(400).json({ message: 'Due date cannot be in the past' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { title, description, assignedTo, priority, dueDate, status },
      { new: true }
    );

    return res.json({ task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single task
exports.getTaskDetails = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).populate('assignedTo');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.json({ task });
  } catch (error) {
    console.error('Error fetching task:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const project = await Project.findById(task.project);
    project.tasks = project.tasks.filter(t => t.toString() !== task._id.toString());
    await project.save();

    await task.deleteOne();

    return res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
