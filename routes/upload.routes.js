const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Αρχεία
 *   description: Μεταφόρτωση αρχείων (π.χ. πτυχία προσωπικού)
 */

// Ρύθμιση αποθήκευσης αρχείων
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/personnel');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, req.params.id + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/**
 * @swagger
 * /uploads/personnel/{id}:
 *   post:
 *     summary: Μεταφόρτωση αρχείου για προσωπικό (π.χ. πτυχίο)
 *     tags: [Αρχεία]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID του προσωπικού
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Το αρχείο ανέβηκε επιτυχώς
 *       500:
 *         description: Σφάλμα διακομιστή κατά την αποθήκευση του αρχείου
 */
router.post('/personnel/:id', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Δεν επιλέχθηκε αρχείο' });
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file,
  });
});

module.exports = router;
