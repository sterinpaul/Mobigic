import multer, { diskStorage } from 'multer';

const Storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `file-${Date.now()}-${file.originalname}`)
    }
});


export const uploads = multer({ storage: Storage }).single('file');