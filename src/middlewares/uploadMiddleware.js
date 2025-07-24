const multer = require('multer');
//const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
        //const folder = file.mimetype.startsWith('image/') ? 'images' : 'documents';
        //cb(null, path.join(__dirname, '../uploads/', folder));
    },
    // filename:(req, file , cb) =>{
    //    // const ext = path.extname(file.originalname);
    //    // const name = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    //    const patientName = req.formFields ? req.formFields.name : 'unknown';
    //     cb(null, `${patientName}-${Date.now()}-${file.originalname}`);
    // }  
    filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
}
});

const fileFilter = (req, file, cb) =>{
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Invalid file type. Only jpeg, jpg and pdf file type allowed.'));
    }
};

const upload = multer({
    storage:storage,
    fileFilter:fileFilter
});

module.exports = upload;