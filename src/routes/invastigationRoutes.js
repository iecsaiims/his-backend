const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const invastigationController = require('../controllers/invastigationController')

router.post('/save-cbc', authMiddleware, invastigationController.createCbcRecord);
router.get('/get-cbc/:patientId', authMiddleware, invastigationController.getcbcRecord);
router.post('/save-lft', authMiddleware, invastigationController.createLftRecord);
router.get('/get-lft/:patientId', authMiddleware, invastigationController.getLftRecord);
router.post('/save-rft', authMiddleware, invastigationController.createRftRecord);
router.get('/get-rft/:patientId', authMiddleware, invastigationController.getRftRecord);
router.post('/save-urineTest', authMiddleware, invastigationController.createurineTestRecord);
router.get('/get-urineTest/:patientId', authMiddleware, invastigationController.getUrineTestRecord);
router.post ('/save-coagulation', authMiddleware, invastigationController.createCoagulationTestRecord);
router.get('/get-coagulation/:patientId', authMiddleware, invastigationController.getCoagulationTestRecord);
module.exports = router;