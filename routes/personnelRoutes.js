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
const isAdmin = require('../middleware/isAdmin');

// ✅ Ανάκτηση όλου του προσωπικού
router.get('/', getAllPersonnel);

// ✅ Ανάκτηση προσωπικού βάσει ID
router.get('/:id', getPersonnelById);

// ✅ Δημιουργία νέου προσωπικού
router.post('/', createPersonnel);

// ✅ Ενημέρωση προσωπικού βάσει ID
router.put('/:id', updatePersonnel);

// ✅ Διαγραφή προσωπικού (μόνο για Admin)
router.delete('/:id', isAdmin, deletePersonnel);

module.exports = router;
