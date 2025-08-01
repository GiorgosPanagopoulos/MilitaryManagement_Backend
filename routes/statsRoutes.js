const express = require('express');
const router = express.Router();

const statsController = require('../controllers/stats/stats.controller');
const isAdmin = require('../middleware/isAdmin');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Στατιστικά
 *   description: Στατιστικά συστήματος (μόνο για εξουσιοδοτημένους χρήστες)
 */

/**
 * @swagger
 * /stats/personnel-by-unit:
 *   get:
 *     summary: Επιστρέφει αριθμό προσωπικού ανά μονάδα
 *     tags: [Στατιστικά]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Επιτυχής απόκριση με στατιστικά προσωπικού ανά μονάδα
 */
router.get('/personnel-by-unit', authMiddleware, statsController.personnelByUnit);

/**
 * @swagger
 * /stats/personnel-by-rank:
 *   get:
 *     summary: Επιστρέφει αριθμό προσωπικού ανά βαθμό
 *     tags: [Στατιστικά]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Επιτυχής απόκριση με στατιστικά προσωπικού ανά βαθμό
 */
router.get('/personnel-by-rank', authMiddleware, statsController.personnelByRank);

/**
 * @swagger
 * /stats/training-participation:
 *   get:
 *     summary: Επιστρέφει συμμετοχές και βαθμολογίες εκπαίδευσης
 *     tags: [Στατιστικά]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Επιτυχής απόκριση με δεδομένα εκπαιδεύσεων
 */
router.get('/training-participation', authMiddleware, statsController.trainingParticipation);

/**
 * @swagger
 * /stats/trainings-by-unit:
 *   get:
 *     summary: Εκπαιδεύσεις ανά μονάδα
 *     tags: [Στατιστικά]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Επιτυχής απόκριση με εκπαιδεύσεις ομαδοποιημένες ανά μονάδα
 */
router.get('/trainings-by-unit', isAdmin, statsController.trainingsByUnit);

/**
 * @swagger
 * /stats/success-rate-by-training:
 *   get:
 *     summary: Ποσοστά επιτυχίας ανά εκπαίδευση
 *     tags: [Στατιστικά]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Επιτυχής απόκριση με ποσοστά επιτυχίας
 */
router.get('/success-rate-by-training', isAdmin, statsController.successRateByTraining);

module.exports = router;
