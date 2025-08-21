const express = require('express');
const router = express.Router();
const handoverNotes = require('../controllers/handoverNotesController')
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/create', authMiddleware, handoverNotes.createHandoverNotes);
router.get('/get-handover/:patientId', authMiddleware, handoverNotes.getHandoverNotesByPatientId);

module.exports = router;