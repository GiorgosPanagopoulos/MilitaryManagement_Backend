const express = require('express');
const router = express.Router();
const Personnel = require('../models/Personnel');
const upload = require('../middleware/upload');
const isAdmin = require('../middleware/isAdmin');

router.post('/:id/upload', isAdmin, upload.single('file'), async (req, res) => {
  try {
    const person = await Personnel.findById(req.params.id);
    if (!person) return res.status(404).json({ message: 'Personnel not found' });

    person.document = req.file.path;
    await person.save();

    res.status(200).json({ message: 'File uploaded successfully', path: req.file.path });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;