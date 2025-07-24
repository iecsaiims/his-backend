const fs = require('fs');
const path = require('path');

function renameUploadedFile(fieldName = 'name') {
  return (req, res, next) => {
    if (!req.file) return next();

    const patientName = (req.body[fieldName] || 'unknown').trim();
    const safeName = patientName.replace(/[^a-z0-9_\-]/gi, '_');
    const oldPath = req.file.path;
    const newFilename = `${safeName}-${Date.now()}-${req.file.originalname}`;
    const newPath = path.join(path.dirname(oldPath), newFilename);

    try {
      fs.renameSync(oldPath, newPath);
      req.file.filename = newFilename;
      req.file.path = newPath;
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = renameUploadedFile;