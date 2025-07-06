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
      personnel, // array από ObjectId
    });

    await newTraining.save();
    res.status(201).json(newTraining);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Ανάκτηση όλων των εκπαιδευτικών αρχείων με populate του personnel
exports.getTrainingRecords = async (req, res) => {
  try {
    const trainingRecords = await TrainingRecord.find().populate('personnel', 'firstName lastName rank');
    res.status(200).json(trainingRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Ανάκτηση για ημερολόγιο (με ορθό τύπο ημερομηνίας)
exports.getAllTrainingsForCalendar = async (req, res) => {
  try {
    const records = await TrainingRecord.find();

    const events = records.map(record => ({
      id: record._id.toString(),
      title: record.description,
      start: new Date(record.from_date),
      end: new Date(record.to_date),
    }));

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Σφάλμα ανάκτησης εκπαιδεύσεων για ημερολόγιο" });
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
    ).populate('personnel', 'firstName lastName rank');

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
