const express = require('express');
const multer = require('multer');
const path = require('path');
const fileController = require('../controllers/files');

const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
    filename: (req, file, cb) => {
        cb(null,  file.originalname);
    },
});

const upload = multer({ storage: storage });
router.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
        return res.status(200).json({ message: 'File uploaded successfully.', filePath });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// router.post('/uploads', (req, res) => {
//     // if(req.query.filename === 'rocket'){
//        res.sendFile(path.join(__dirname, "uploads/fed4ddb2-11ea-4808-829d-92793de11972.png"));
//     // }
//   })

// router.post('/uploads', fileController.getFile);
// Handle file upload
// router.post('/upload', upload.single('image'), (req, res) => {
//     return res.send("Single file")
// });

module.exports = router;


// const express = require('express');
// var router = express.Router();
// const filesController = require('../controllers/files');
// const authenticate = require("../refreshMiddleware");//todo add auth

// router.post('/file',authenticate,filesController.saveFile);