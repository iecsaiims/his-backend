const express = require('express');
const router = express.Router();
const  authMiddleware  = require('../middlewares/authMiddleware');

const { createPrimaryAssessment, getPrimaryAssessmentDetails } = require('../controllers/primaryAssessmentController');

router.post('/create',authMiddleware, createPrimaryAssessment);
router.get('/:patientId',authMiddleware,getPrimaryAssessmentDetails);

module.exports = router;
