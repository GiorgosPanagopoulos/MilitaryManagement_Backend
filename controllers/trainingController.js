const TrainingRecord = require('../models/TrainingRecord');

// ✅ Δημιουργία νέας εκπαίδευσης
exports.createTraining = async (req, res) => {
  const { description, location, from_date, to_date, personnel } = req.body;

  try {
    const newTraining = new TrainingRecord({
      description,
      location,
      from_date,
      to_date,
      personnel
    });

    await newTraining.save();
    res.status(201).json(newTraining);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Ανάκτηση όλων των εκπαιδευτικών αρχείων
exports.getTrainingRecords = async (req, res) => {
  try {
    const trainingRecords = await TrainingRecord.find().populate("personnel");
    res.status(200).json(trainingRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Ενημέρωση υπάρχουσας εκπαίδευσης
exports.updateTraining = async (req, res) => {
  try {
    const updated = await TrainingRecord.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
        location: req.body.location,
        from_date: req.body.from_date,
        to_date: req.body.to_date,
        personnel: req.body.personnel,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Δεν βρέθηκε εκπαίδευση" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Διαγραφή εκπαίδευσης
exports.deleteTraining = async (req, res) => {
  try {
    const deleted = await TrainingRecord.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Δεν βρέθηκε εκπαίδευση" });
    }
    res.json({ message: "Η εκπαίδευση διαγράφηκε επιτυχώς" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
