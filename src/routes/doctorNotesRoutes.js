const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware');
const doctorNotesController = require('../controllers/doctorNotesController')

    // const uploadFields = upload.fields([
    //     { name: 'lama_consent_document'}
    // ]);


router.post('/create-emergencycare', authMiddleware, doctorNotesController.createGeneralEmergencyCare);
router.get('/emergency-care/:patientId', authMiddleware, doctorNotesController.getGeneralEmergencyCareByPatient);
router.post('/trauma-template',authMiddleware, doctorNotesController.createTraumaTemplate);
router.get('/trauma-template/:patientId',authMiddleware, doctorNotesController.getTraumaTemplateByPatient);
router.post('/progress-notes', authMiddleware,doctorNotesController.createProgressNotes);
router.get('/progress-notes/:patientId',authMiddleware, doctorNotesController.getProgressNotesByPatient);
router.post('/dischage-summary', authMiddleware,doctorNotesController.createDischargeSummary);
router.get('/dischage-summary/:patientId',authMiddleware, doctorNotesController.getDischargeSummaryByPatient);
router.post('/transfer-out',authMiddleware, doctorNotesController.createTransferOut);
router.get('/transfer-out/:patientId',authMiddleware, doctorNotesController.getTransferOutByPatient);
router.post('/lama', upload.single('lama_consent_document'),authMiddleware, doctorNotesController.createLamaConsent);
router.get('/lama/:patientId',authMiddleware, doctorNotesController.getLamaConsent);
// router.post('/other-test', authMiddleware, doctorNotesController.createOtherTest);
// router.get('/other-test/:patientId', authMiddleware, doctorNotesController.getOtherTestRecords);
// router.post('/ct-scan', authMiddleware, doctorNotesController.createCTScan);
// router.get('/ct-scan/:patientId', authMiddleware, doctorNotesController.getCtScanRecords);
// router.post('/blood-gas', authMiddleware, doctorNotesController.createBloodGas);
// router.get('/blood-gas/:patientId', authMiddleware, doctorNotesController.getBloodGasRecords);
// router.post('/troponin', authMiddleware, doctorNotesController.createTroponin);
// router.get('/troponin/:patientId', authMiddleware, doctorNotesController.getTroponinRecords);
// router.post('/ecg', authMiddleware, doctorNotesController.createECG);
// router.get('/ecg/:patientId', authMiddleware, doctorNotesController.getECGRecords);

module.exports = router;