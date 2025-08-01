const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin');

const {
  createTraining,
  getTrainingRecords,
  updateTraining,
  deleteTraining,
  getAllTrainingsForCalendar,
} = require('../controllers/trainingController');

/**
 * @swagger
 * components:
 *   schemas:
 *     TrainingDto:
 *       type: object
 *       required:
 *         - description
 *         - location
 *         - startDate
 *         - endDate
 *       properties:
 *         description:
 *           type: string
 *           example: Σχολείο Ηλεκτρονικού Πολέμου
 *         location:
 *           type: string
 *           example: ΣΔΑΜ
 *         startDate:
 *           type: string
 *           format: date
 *           example: 2025-08-01
 *         endDate:
 *           type: string
 *           format: date
 *           example: 2025-08-10
 *         personnelIds:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * tags:
 *   - name: Εκπαίδευση
 *     description: Διαχείριση Εκπαιδεύσεων
 */

/**
 * @swagger
 * /training:
 *   post:
 *     summary: Δημιουργία νέας εκπαίδευσης
 *     tags: [Εκπαίδευση]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainingDto'
 *     responses:
 *       201:
 *         description: Εκπαίδευση δημιουργήθηκε
 */
router.post('/', authMiddleware, createTraining);

/**
 * @swagger
 * /training:
 *   get:
 *     summary: Ανάκτηση όλων των εκπαιδεύσεων
 *     tags: [Εκπαίδευση]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Λίστα εκπαιδεύσεων
 */
router.get('/', authMiddleware, getTrainingRecords);

/**
 * @swagger
 * /training/calendar:
 *   get:
 *     summary: Εκπαιδεύσεις για ημερολόγιο
 *     tags: [Εκπαίδευση]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Εκπαιδεύσεις σε μορφή ημερολογίου
 */
router.get('/calendar', authMiddleware, getAllTrainingsForCalendar);

/**
 * @swagger
 * /training/{id}:
 *   put:
 *     summary: Ενημέρωση εκπαίδευσης
 *     tags: [Εκπαίδευση]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Το ID της εκπαίδευσης
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainingDto'
 *     responses:
 *       200:
 *         description: Εκπαίδευση ενημερώθηκε
 */
router.put('/:id', authMiddleware, updateTraining);

/**
 * @swagger
 * /training/{id}:
 *   delete:
 *     summary: Διαγραφή εκπαίδευσης
 *     tags: [Εκπαίδευση]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Το ID της εκπαίδευσης
 *     responses:
 *       200:
 *         description: Εκπαίδευση διαγράφηκε
 */
router.delete('/:id', authMiddleware, isAdmin, deleteTraining);

module.exports = router;
