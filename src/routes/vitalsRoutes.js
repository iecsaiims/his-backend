const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const vitalRecordsController  = require('../controllers/vitalRecordController')

router.post('/create', authMiddleware, vitalRecordsController.createVitalRecord);
router.get('/get-vitals/:patientId', authMiddleware, vitalRecordsController.getVitalRecord);
module.exports = router;