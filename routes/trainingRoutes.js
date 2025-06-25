const isAdmin = require('../middleware/isAdmin');
// routes/trainingRoutes.js
const express = require('express');
const router = express.Router();

// Εισαγωγή των controller functions
const { createTraining, getTrainingRecords } = require('../controllers/trainingController');

// Δημιουργία νέας εκπαίδευσης
router.post('/create', createTraining);  // Εξασφαλίστε ότι η 'createTraining' είναι ορισμένη στον controller

// Ανάκτηση όλων των εκπαιδευτικών αρχείων
router.get('/', getTrainingRecords);  // Εξασφαλίστε ότι η 'getTrainingRecords' είναι ορισμένη στον controller

module.exports = router;