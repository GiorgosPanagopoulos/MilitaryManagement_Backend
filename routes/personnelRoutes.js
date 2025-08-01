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

/**
 * @swagger
 * components:
 *   schemas:
 *     PersonelDto:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - rank
 *         - serviceNumber
 *         - phone
 *         - email
 *         - unit
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         rank:
 *           type: string
 *         serviceNumber:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         unit:
 *           type: string

 * @swagger
 * tags:
 *   - name: Προσωπικό
 *     description: Διαχείριση στρατιωτικού προσωπικού
 */

/**
 * @swagger
 * /personnel:
 *   get:
 *     summary: Λήψη όλου του προσωπικού
 *     tags: [Προσωπικό]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Λίστα προσωπικού
 */
router.get('/', authMiddleware, getAllPersonnel);

/**
 * @swagger
 * /personnel/{id}:
 *   get:
 *     summary: Λήψη προσωπικού ανά ID
 *     tags: [Προσωπικό]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Το ID του προσωπικού
 *     responses:
 *       200:
 *         description: Προσωπικό με βάση το ID
 */
router.get('/:id', authMiddleware, getPersonnelById);

/**
 * @swagger
 * /personnel:
 *   post:
 *     summary: Δημιουργία νέου προσωπικού
 *     tags: [Προσωπικό]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonelDto'
 *     responses:
 *       201:
 *         description: Το προσωπικό δημιουργήθηκε
 */
router.post('/', authMiddleware, createPersonnel);

/**
 * @swagger
 * /personnel/{id}:
 *   put:
 *     summary: Ενημέρωση προσωπικού
 *     tags: [Προσωπικό]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Το ID του προσωπικού
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonelDto'
 *     responses:
 *       200:
 *         description: Προσωπικό ενημερώθηκε
 */
router.put('/:id', authMiddleware, updatePersonnel);

/**
 * @swagger
 * /personnel/{id}:
 *   delete:
 *     summary: Διαγραφή προσωπικού
 *     tags: [Προσωπικό]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Το ID του προσωπικού
 *     responses:
 *       200:
 *         description: Προσωπικό διαγράφηκε
 */
router.delete('/:id', authMiddleware, isAdmin, deletePersonnel);

module.exports = router;
