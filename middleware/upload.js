const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ρύθμιση φακέλου αποθήκευσης
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = 'uploads/';
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

module.exports = upload;