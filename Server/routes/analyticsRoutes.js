const express = require('express');
const router = express.Router();

const {getMemberProductivity,getTaskCompletionAnalytics} = require("../controllers/analyticsController");

const {authenticate} = require("../middlewares/authMiddleware");

router.get("/",getMemberProductivity);
router.get("/task",getTaskCompletionAnalytics);

module.exports = router;