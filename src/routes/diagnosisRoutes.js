const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const diagnosisController = require('../controllers/diagnosisController')
router.post('/save-diagnosis', authMiddleware, diagnosisController.createDiagnosisRecord);
router.get('/get-diagnosis/:patientId', authMiddleware, diagnosisController.getDiagnosisRecord);

module.exports = router;