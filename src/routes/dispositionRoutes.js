const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware');
const dispositionController = require('../controllers/dispositionController')
const renameUploadedFile = require('../middlewares/renameUploadedFile');

router.post('/dischage-summary', authMiddleware,dispositionController.createDischargeSummary);
router.get('/dischage-summary/:patientId',authMiddleware, dispositionController.getDischargeSummaryByPatient);
router.post('/transfer-out',authMiddleware, dispositionController.createTransferOut);
router.get('/transfer-out/:patientId',authMiddleware, dispositionController.getTransferOutByPatient);
router.post('/lama',authMiddleware, upload.single('lamaConsentDocument'),renameUploadedFile('name'), dispositionController.createLamaConsent);
router.get('/lama/:patientId',authMiddleware, dispositionController.getLamaConsent);


module.exports = router;