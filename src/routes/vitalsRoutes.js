const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const vitalRecordsController  = require('../controllers/vitalRecordController')

router.post('/vitals', authMiddleware, vitalRecordsController.createVitalRecord);
router.get('/vitals/:patientId', authMiddleware, vitalRecordsController.getVitalRecord);
module.exports = router;