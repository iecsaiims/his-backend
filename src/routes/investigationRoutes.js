const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const investigationController = require('../controllers/investigationController')

router.post('/save-cbc', authMiddleware, investigationController.createCbcRecord);
router.get('/get-cbc/:patientId', authMiddleware, investigationController.getcbcRecord);
router.post('/save-lft', authMiddleware, investigationController.createLftRecord);
router.get('/get-lft/:patientId', authMiddleware, investigationController.getLftRecord);
router.post('/save-rft', authMiddleware, investigationController.createRftRecord);
router.get('/get-rft/:patientId', authMiddleware, investigationController.getRftRecord);
router.post('/save-urineTest', authMiddleware, investigationController.createUrineTestRecord);
router.get('/get-urineTest/:patientId', authMiddleware, investigationController.getUrineTestRecord);
router.post ('/save-coagulation', authMiddleware, investigationController.createCoagulationTestRecord);
router.get('/get-coagulation/:patientId', authMiddleware, investigationController.getCoagulationTestRecord);
module.exports = router;