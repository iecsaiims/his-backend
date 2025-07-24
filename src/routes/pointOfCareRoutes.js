const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware');
const pointOfCareController = require('../controllers/pointOfCareController')
const renameUploadedFile = require('../middlewares/renameUploadedFile');


router.post('/other-test',express.json(), authMiddleware, pointOfCareController.createOtherTestRecord);
router.get('/other-test/:patientId', authMiddleware, pointOfCareController.getOtherTestRecords);
router.post('/ct-scan',authMiddleware, upload.single('ctScanImage'),renameUploadedFile('name'), pointOfCareController.createCtScanRecord);
router.get('/ct-scan/:patientId', authMiddleware, pointOfCareController.getCtScanRecords);
router.post('/blood-gas', authMiddleware, upload.single('bloodGasImage'),renameUploadedFile('name'), pointOfCareController.createBloodGasRecord);
router.get('/blood-gas/:patientId', authMiddleware, pointOfCareController.getBloodGasRecords);
router.post('/troponin',express.json(), authMiddleware, pointOfCareController.createTroponinRecord);
router.get('/troponin/:patientId', authMiddleware, pointOfCareController.getTroponinRecords);
router.post('/ecg', authMiddleware, upload.single('ecgImage'),renameUploadedFile('name'), pointOfCareController.createEcgRecord);
router.get('/ecg/:patientId', authMiddleware, pointOfCareController.getEcgRecords);
router.post('/xray', authMiddleware, upload.single('xrayImage'),renameUploadedFile('name'), pointOfCareController.createXrayRecord);
router.get('/xray/:patientId', authMiddleware, pointOfCareController.getXrayRecords);

module.exports = router;