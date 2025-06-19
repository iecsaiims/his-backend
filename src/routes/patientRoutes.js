const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController')

router.post('/registerPatient', patientController.registerPatient);
router.post('/addTriage/:id', patientController.submitTriage);
router.get('/getPatientDetails/:id', patientController.getPatientTriage);
router.get('/getPatientList', patientController.getPatientList);

module.exports = router;