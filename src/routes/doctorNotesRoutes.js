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
router.post('/trauma-template', doctorNotesController.createTraumaTemplate);
router.get('/trauma-template/:patientId', doctorNotesController.getTraumaTemplateByPatient);
router.post('/progress-notes', doctorNotesController.createProgressNotes);
router.get('/progress-notes/:patientId', doctorNotesController.getProgressNotesByPatient);
router.post('/dischage-summary', doctorNotesController.createDischargeSummary);
router.get('/dischage-summary/:patientId', doctorNotesController.getDischargeSummaryByPatient);
router.post('/transfer-out', doctorNotesController.createTransferOut);
router.get('/transfer-out/:patientId', doctorNotesController.getTransferOutByPatient);
router.post('/lama', upload.single('lama_consent_document'), doctorNotesController.createLamaConsent);
router.get('/lama/:patientId', controller.getLamaConsent);
router.post('/xray',upload.single('xray'),doctorNotesController.uploadXray )

module.exports = router;