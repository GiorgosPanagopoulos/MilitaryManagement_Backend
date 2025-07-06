const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

const {
  createTraining,
  getTrainingRecords,
  updateTraining,
  deleteTraining,
  getAllTrainingsForCalendar, // 🆕
} = require('../controllers/trainingController');

// ✅ Δημιουργία νέας εκπαίδευσης (μόνο για πιστοποιημένους χρήστες)
router.post('/', authMiddleware, createTraining);

// ✅ Ανάκτηση όλων των εκπαιδεύσεων (μόνο για πιστοποιημένους χρήστες)
router.get('/', authMiddleware, getTrainingRecords);

// ✅ Ανάκτηση για ημερολόγιο εκπαιδεύσεων (μόνο για πιστοποιημένους χρήστες)
router.get('/calendar', authMiddleware, getAllTrainingsForCalendar); // 🆕

// ✅ Ενημέρωση εκπαίδευσης (μόνο για πιστοποιημένους χρήστες)
router.put('/:id', authMiddleware, updateTraining);

// ✅ Διαγραφή εκπαίδευσης (μόνο για admin)
router.delete('/:id', authMiddleware, isAdmin, deleteTraining);

module.exports = router;
