const express = require('express');
const router = express.Router();

const {createOrganization,getUserOrganizations,addUserToOrganization} = require('../controllers/organizationController');
const{authenticate} = require("../middlewares/authMiddleware");

router.post("/:orgId/users",authenticate,addUserToOrganization);
router.post('/create',authenticate,createOrganization);
router.get("/",authenticate,getUserOrganizations);


module.exports = router;

