const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, assignedTo, priority, dueDate, projectId } = req.body;

  try {
    // Validate project existence
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Validate user existence
    const user = await User.findById(assignedTo);
    if (!user) {
      return res.status(400).json({ message: 'Assigned user not found' });
    }

    // Validate if the user is part of the project (optional)
    if (!project.members.includes(assignedTo)) {
      return res.status(400).json({ message: 'User is not part of the project' });
    }

    // Validate priority
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority' });
    }

    // Validate dueDate (should not be in the past)
    if (new Date(dueDate) < new Date()) {
      return res.status(400).json({ message: 'Due date cannot be in the past' });
    }

    // Create task
    const task = new Task({
      title,
      description,
      assignedTo,
      priority,
      dueDate,
      project: projectId,
    });

    await task.save();

    // Add task to project
    project.tasks.push(task._id);
    await project.save();

    return res.status(201).json({ task });
  } catch (error) {
    console.error('Error in createTask:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { title, description, assignedTo, priority, dueDate, status } = req.body;

  try {
    // Validate task existence
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Validate assigned user
    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (!user) {
        return res.status(400).json({ message: 'Assigned user not found' });
      }
    }

    // Validate priority (optional)
    if (priority) {
      const validPriorities = ['low', 'medium', 'high'];
      if (!validPriorities.includes(priority)) {
        return res.status(400).json({ message: 'Invalid priority' });
      }
    }

    // Validate dueDate (should not be in the past)
    if (dueDate && new Date(dueDate) < new Date()) {
      return res.status(400).json({ message: 'Due date cannot be in the past' });
    }

    // Update task fields
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title,
        description,
        assignedTo,
        priority,
        dueDate,
        status,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({ task: updatedTask });
  } catch (error) {
    console.error('Error in updateTask:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get task details
exports.getTaskDetails = async (req, res) => {
  try {
    // Get task by ID and populate assigned user details
    const task = await Task.findById(req.params.taskId).populate('assignedTo');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({ task });
  } catch (error) {
    console.error('Error in getTaskDetails:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a task (optional)
exports.deleteTask = async (req, res) => {
  try {
    // Get the task to be deleted
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Remove the task from the project
    const project = await Project.findById(task.project);
    project.tasks = project.tasks.filter(t => t.toString() !== task._id.toString());
    await project.save();

    // Delete the task
    await task.deleteOne();

    return res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error in deleteTask:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
