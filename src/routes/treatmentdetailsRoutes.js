const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const treatmentDetailsController  = require('../controllers/treatmentdetailsControllers')
const treatmentNursingController = require('../controllers/treatmentNursingController')

router.post('/save-treatment', authMiddleware, treatmentDetailsController.createTreatmentRecord);
router.get('/get-treatment/:patientId', authMiddleware, treatmentDetailsController.getTreatmentRecord);

router.post('/save-treatment-nursing', authMiddleware, treatmentNursingController.createTreatmentNursingRecord);
router.get('/get-treatment-nursing/:patientId', authMiddleware, treatmentNursingController.getTreatmentNursingRecord);

router.get('/get-full-treatment/:patientId', authMiddleware, treatmentDetailsController.getFullTreatmentDetails);

module.exports = router;