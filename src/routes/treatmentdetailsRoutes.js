const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const treatmentDetailsController  = require('../controllers/treatmentdetailsControllers')

router.post('/save-treatment', authMiddleware, treatmentDetailsController.createTreatmentRecord);
router.get('/get-treatment/:patientId', authMiddleware, treatmentDetailsController.getTreatmentRecord);
module.exports = router;