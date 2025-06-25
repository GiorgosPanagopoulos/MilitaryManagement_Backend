const isAdmin = require('../middleware/isAdmin');
const express = require('express');
const router = express.Router();
const {
  getPersonnelById,
  updatePersonnel,
  createPersonnel,
  deletePersonnel
} = require('../controllers/personnelController');

// Ανάκτηση προσωπικών δεδομένων στρατιωτικού
router.get('/:id', getPersonnelById);

// Ενημέρωση προσωπικών δεδομένων στρατιωτικού
router.put('/:id', updatePersonnel);

// Δημιουργία νέου στρατιωτικού προσωπικού
router.post('/', createPersonnel);

// ✅ Διαγραφή στρατιωτικού προσωπικού (μόνο για Admin)
router.delete('/:id', isAdmin, deletePersonnel);

module.exports = router;
