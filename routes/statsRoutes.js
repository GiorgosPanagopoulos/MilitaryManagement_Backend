const express = require('express');
const router = express.Router();

// Σωστό path στο controller
const statsController = require('../controllers/stats/stats.controller');

const isAdmin = require('../middleware/isAdmin');
const authMiddleware = require('../middleware/auth.middleware');

// 📊 Προσωπικό ανά μονάδα
router.get('/personnel-by-unit', authMiddleware, statsController.personnelByUnit);

// 📊 Προσωπικό ανά βαθμό
router.get('/personnel-by-rank', authMiddleware, statsController.personnelByRank);

// 📊 Συμμετοχές & Βαθμολογίες εκπαίδευσης
router.get('/training-participation', authMiddleware, statsController.trainingParticipation);

// 📈 Εκπαιδεύσεις ανά Μονάδα
router.get('/trainings-by-unit', isAdmin, statsController.trainingsByUnit);

// 📈 Ποσοστά επιτυχίας ανά Εκπαίδευση
router.get('/success-rate-by-training', isAdmin, statsController.successRateByTraining);

module.exports = router;
