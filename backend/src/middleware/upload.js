import path from 'path';
import multer from 'multer';

// define our file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // specify the directory to store uploaded files
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    });


    //filter images to be allowed
const fileFilter = (req, file, cb) => {
   let allowedTypes = /jpeg|jpg|png|svg|gif/; // allowed file types
    const ext = path.extname(file.originalname).toLowerCase(); // check extension

    if (allowedTypes.test(ext)) {
        return cb(null, true); // accept the file
    } else {
        cb(new Error('Only images are allowed!')); // reject the file
    }
};


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // limit file size to 5MB
    },
    fileFilter: fileFilter, // apply the file filter
});

export default upload; // export the middleware to handle single file upload with field name 'image'