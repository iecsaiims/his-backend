const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware');
const pointOfCareController = require('../controllers/pointOfCareController')


router.post('/other-test', authMiddleware, pointOfCareController.createOtherTestRecord);
router.get('/other-test/:patientId', authMiddleware, pointOfCareController.getOtherTestRecords);
router.post('/ct-scan', upload.single('ctScanDocument'), authMiddleware, pointOfCareController.createCtScanRecord);
router.get('/ct-scan/:patientId', authMiddleware, pointOfCareController.getCtScanRecords);
router.post('/blood-gas', upload.single('bloodGasDocument'), authMiddleware, pointOfCareController.createBloodGasRecord);
router.get('/blood-gas/:patientId', authMiddleware, pointOfCareController.getBloodGasRecords);
router.post('/troponin', authMiddleware, pointOfCareController.createTroponinRecord);
router.get('/troponin/:patientId', authMiddleware, pointOfCareController.getTroponinRecords);
router.post('/ecg', upload.single('ecgImage'), authMiddleware, pointOfCareController.createEcgRecord);
router.get('/ecg/:patientId', authMiddleware, pointOfCareController.getEcgRecords);
router.post('/xray', upload.single('xrayImage'), authMiddleware, pointOfCareController.createXrayRecord);
router.get('/xray/:patientId', authMiddleware, pointOfCareController.getXrayRecords);

module.exports = router;