const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middlewares/authMiddleware'); // Your JWT verify middleware

// GET /api/files/:filename
router.get('/:filename', authMiddleware, (req, res) => {
  const { filename } = req.params;

  const filePath = path.join(__dirname, '../../uploads', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.sendFile(filePath);
});

module.exports = router;
