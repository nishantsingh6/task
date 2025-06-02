const express = require('express');
const router = express.Router();


const {createTask,updateTask,getTaskDetails,deleteTask} = require("../controllers/taskController");


const{authenticate} = require("../middlewares/authMiddleware");

router.post('/:projectId/tasks', authenticate,createTask);


router.put('/:projectId/tasks/:taskId', authenticate,updateTask);

router.get('/:projectId/tasks/:taskId', authenticate,getTaskDetails);

router.delete('/:projectId/tasks/:taskId', authenticate,deleteTask);

module.exports = router;
