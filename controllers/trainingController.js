// controllers/trainingController.js
const TrainingRecord = require('../models/TrainingRecord');

// Δημιουργία νέας εκπαίδευσης
exports.createTraining = async (req, res) => {
  const { training_name, training_date, success_rate } = req.body;

  try {
    const newTraining = new TrainingRecord({
      training_name,
      training_date,
      success_rate
    });

    await newTraining.save();
    res.status(201).json(newTraining); // Επιστροφή του νέου εκπαιδευτικού αρχείου
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ανάκτηση όλων των εκπαιδευτικών αρχείων
exports.getTrainingRecords = async (req, res) => {
  try {
    const trainingRecords = await TrainingRecord.find();
    res.status(200).json(trainingRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
