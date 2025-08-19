const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const InOutController  = require('../controllers/inOutController')

router.post('/create', authMiddleware, InOutController.createInOutRecord);
router.get('/get-inout/:patientId', authMiddleware, InOutController.getInOutRecord);
module.exports = router;