const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController')
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/registerPatient',authMiddleware, patientController.registerPatient);
router.post('/addTriage',authMiddleware, patientController.submitTriage);
router.get('/patientDetails/:patientId',authMiddleware,patientController.getPatientTriage);
router.get('/patientList',authMiddleware, patientController.getPatientList);
router.get('/patientList/triage',authMiddleware, patientController.getPatientListWithTriage)
router.get('/all-triages/:id',authMiddleware, patientController.getAllTriageRecords);

module.exports = router;