const express = require('express');
const router = express.Router();

const { createPrimaryAssessment } = require('../controllers/primaryAssessmentController');

router.post('/create', createPrimaryAssessment);

module.exports = router;
