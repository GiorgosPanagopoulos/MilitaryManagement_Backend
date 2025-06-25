const isAdmin = require('../middleware/isAdmin');
const express = require('express');
const router = express.Router();

// Εισαγωγή των controller functions
const { createService, addPersonnelToService, removePersonnelFromService } = require('../controllers/serviceController');

// Δημιουργία νέας υπηρεσίας
router.post('/create', createService);  // Βεβαιώσου ότι η συνάρτηση 'createService' υπάρχει στον controller

// Πρόσθεση στρατιωτικού προσωπικού σε υπηρεσία
router.post('/add-personnel', addPersonnelToService);  // Βεβαιώσου ότι η συνάρτηση 'addPersonnelToService' υπάρχει στον controller

// Αφαίρεση στρατιωτικού προσωπικού από υπηρεσία
router.post('/remove-personnel', removePersonnelFromService);  // Βεβαιώσου ότι η συνάρτηση 'removePersonnelFromService' υπάρχει στον controller

module.exports = router;