const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const treatmentdetailsController  = require('../controllers/treatmentdetailsControllers')

router.post('/save-treatment', authMiddleware, treatmentdetailsController.createTreatmentRecord);
router.get('/get-treatment/:patientId', authMiddleware, treatmentdetailsController.getTreatmentRecord);
module.exports = router;