const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportcontroller");
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/export", reportController.exportBasicTriageExcel);
router.get("/dashboard/doctor", dashboardController.getDoctorDashboard);

module.exports = router;
