const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  getTaskDetails,
  deleteTask,
} = require('../controllers/taskController');
const { authenticate } = require('../middlewares/authMiddleware');

// Match frontend usage
router.get('/', authenticate, getAllTasks);           // GET /api/task
router.post('/', authenticate, createTask);           // POST /api/task
router.put('/:taskId', authenticate, updateTask);     // PUT /api/task/:taskId
router.get('/:taskId', authenticate, getTaskDetails); // GET /api/task/:taskId
router.delete('/:taskId', authenticate, deleteTask);  // DELETE /api/task/:taskId

module.exports = router;
