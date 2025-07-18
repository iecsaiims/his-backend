const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware');
const dispositionController = require('../controllers/dispositionController')

router.post('/dischage-summary', authMiddleware,dispositionController.createDischargeSummary);
router.get('/dischage-summary/:patientId',authMiddleware, dispositionController.getDischargeSummaryByPatient);
router.post('/transfer-out',authMiddleware, dispositionController.createTransferOut);
router.get('/transfer-out/:patientId',authMiddleware, dispositionController.getTransferOutByPatient);
router.post('/lama', upload.single('lamaConsentDocument'),authMiddleware, dispositionController.createLamaConsent);
router.get('/lama/:patientId',authMiddleware, dispositionController.getLamaConsent);


module.exports = router;