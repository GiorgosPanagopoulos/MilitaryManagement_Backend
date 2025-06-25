const express = require('express');
const router = express.Router();
const Training = require('../models/Training');
const upload = require('../middleware/upload');
const isAdmin = require('../middleware/isAdmin');

router.post('/:id/upload', isAdmin, upload.single('file'), async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) return res.status(404).json({ message: 'Training not found' });

    training.document = req.file.path;
    await training.save();

    res.status(200).json({ message: 'File uploaded successfully', path: req.file.path });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;