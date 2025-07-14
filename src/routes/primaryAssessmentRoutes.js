const express = require('express');
const router = express.Router();

const { createPrimaryAssessment, getPrimaryAssessmentDetails } = require('../controllers/primaryAssessmentController');

router.post('/create', createPrimaryAssessment);
router.get('/:patientId', getPrimaryAssessmentDetails);

module.exports = router;
