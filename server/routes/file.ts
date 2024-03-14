import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import path from 'path';

const router: Router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, 'public/');
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: API for upload files
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image file
 *     tags: [Upload]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *         description: Image file to upload
 *     responses:
 *       '200':
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             example: {"message": "File uploaded successfully.", "filePath": "/public/filename.jpg"}
 *       '400':
 *         description: No file uploaded
 *         content:
 *           application/json:
 *             example: {"error": "No file uploaded."}
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: {"error": "Internal server error."}
 */
router.post('/upload', upload.single('image'), (req: Request, res: Response) => {
    try {
        console.log("file upload");
        console.log(req.file);
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const filePath = path.join(__dirname, '..', 'public', req.file.filename);
        console.log(filePath);
        return res.status(200).json({ message: 'File uploaded successfully.', filePath });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

export default router;