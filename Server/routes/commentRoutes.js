const express = require('express');
const router = express.Router();

const{createComment,getCommentsForTask,deleteComment} = require("../controllers/commentController");
const{authenticate} = require("../middlewares/authMiddleware");

// Create comment
router.post('/', authenticate, createComment);

// Get comments for a task
router.get('/task/:taskId', authenticate, getCommentsForTask);

// Delete comment
router.delete('/:commentId', authenticate, deleteComment);

module.exports = router;
