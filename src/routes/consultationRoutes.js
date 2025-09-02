const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware');
const edConsultationController = require('../controllers/consultationController')
const renameUploadedFile = require('../middlewares/renameUploadedFile');

router.post('/consultation', authMiddleware, upload.single('consultationImage'), renameUploadedFile('name'), edConsultationController.createEdConsultation);
router.get('/consultation/:patientId', authMiddleware, edConsultationController.getEdConsultationRecords);

module.exports = router;