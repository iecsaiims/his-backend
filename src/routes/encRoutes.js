const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const encController = require('../controllers/encController');

router.post('/save-enc', authMiddleware, encController.submitEncRecord);
router.get('/get-enc/:patientId', authMiddleware, encController.getEncRecordByPatient);
router.post('/save-enc-consultation', authMiddleware, encController.submitConsultation);
router.get('/get-enc-consultations/:patientId', authMiddleware, encController.getConsultationByPatient);
module.exports = router;
