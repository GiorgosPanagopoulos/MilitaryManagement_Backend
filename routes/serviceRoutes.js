const isAdmin = require('../middleware/isAdmin');
const express = require('express');
const router = express.Router();

// Controller functions
const {
  createService,
  addPersonnelToService,
  removePersonnelFromService,
} = require('../controllers/serviceController');

/**
 * @swagger
 * tags:
 *   name: Υπηρεσίες
 *   description: Διαχείριση μονάδων / υπηρεσιών
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Ναυτική Διοίκηση Αιγαίου
 *     ServiceAssignmentDto:
 *       type: object
 *       required:
 *         - personnelId
 *         - serviceId
 *       properties:
 *         personnelId:
 *           type: string
 *           example: 64f3c123abc456def7890abc
 *         serviceId:
 *           type: string
 *           example: 64f3c987def123abc4567890
 */

/**
 * @swagger
 * /service/create:
 *   post:
 *     summary: Δημιουργία νέας υπηρεσίας
 *     tags: [Υπηρεσίες]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceDto'
 *     responses:
 *       201:
 *         description: Η υπηρεσία δημιουργήθηκε
 */
router.post('/create', createService);

/**
 * @swagger
 * /service/add-personnel:
 *   post:
 *     summary: Ανάθεση προσωπικού σε υπηρεσία
 *     tags: [Υπηρεσίες]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceAssignmentDto'
 *     responses:
 *       200:
 *         description: Το προσωπικό προστέθηκε στην υπηρεσία
 */
router.post('/add-personnel', addPersonnelToService);

/**
 * @swagger
 * /service/remove-personnel:
 *   post:
 *     summary: Αφαίρεση προσωπικού από υπηρεσία
 *     tags: [Υπηρεσίες]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceAssignmentDto'
 *     responses:
 *       200:
 *         description: Το προσωπικό αφαιρέθηκε από την υπηρεσία
 */
router.post('/remove-personnel', removePersonnelFromService);

module.exports = router;
