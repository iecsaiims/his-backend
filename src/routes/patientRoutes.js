const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController')

router.post('/registerPatient', patientController.registerPatient);
router.post('/addTriage/:id', patientController.submitTriage);
router.get('/patientDetails/:patientId', patientController.getPatientTriage);
router.get('/patientList', patientController.getPatientList);
router.get('/patientList/triage', patientController.getPatientListWithTriage)

module.exports = router;