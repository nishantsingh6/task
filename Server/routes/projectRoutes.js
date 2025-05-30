const express = require('express');
const router = express.Router();

const {createProject,updateProject,deleteProject,getProjectDetails,getProjects} = require('../controllers/projectController');

const {authenticate} = require('../middlewares/authMiddleware');
router.post('/create', authenticate, createProject);

// Get all projects for an organization
router.get('/organization/:orgId', authenticate, getProjects);

// Get project details
router.get('/:projectId', authenticate, getProjectDetails);

// Update a project — only Admin/Manager
router.put('/:projectId', authenticate, updateProject);

// Delete a project — only Admin/Manager
router.delete('/:projectId', authenticate, deleteProject);

module.exports = router;