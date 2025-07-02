// routes/personnelRoutes.js
const express = require('express');
const router = express.Router();

const {
  getAllPersonnel,
  getPersonnelById,
  createPersonnel,
  updatePersonnel,
  deletePersonnel,
} = require('../controllers/personnelController');

const authMiddleware = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

// ✅ Ανάκτηση όλου του προσωπικού (με token)
router.get('/', authMiddleware, getAllPersonnel);

// ✅ Ανάκτηση προσωπικού βάσει ID (με token)
router.get('/:id', authMiddleware, getPersonnelById);

// ✅ Δημιουργία νέου προσωπικού (με token)
router.post('/', authMiddleware, createPersonnel);

// ✅ Ενημέρωση προσωπικού βάσει ID (με token)
router.put('/:id', authMiddleware, updatePersonnel);

// ✅ Διαγραφή προσωπικού (με token + admin check)
router.delete('/:id', authMiddleware, isAdmin, deletePersonnel);

module.exports = router;
