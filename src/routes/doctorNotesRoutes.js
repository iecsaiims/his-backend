const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
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



module.exports = router;