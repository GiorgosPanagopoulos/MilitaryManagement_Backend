const express = require('express');
const router = express.Router();
const statsController = require('../controllers/stats/stats.controller');
const isAdmin = require('../middleware/isAdmin');

router.get('/trainings-by-unit', isAdmin, statsController.trainingsByUnit);
router.get('/success-rate-by-training', isAdmin, statsController.successRateByTraining);

module.exports = router;