const trainingService = require('../services/training.service');

// ✅ Δημιουργία νέας εκπαίδευσης με validation
exports.createTraining = async (req, res) => {
  const { description, location, from_date, to_date, personnel } = req.body;

  if (new Date(from_date) > new Date(to_date)) {
    return res.status(400).json({
      message: "Η ημερομηνία έναρξης δεν μπορεί να είναι μετά τη λήξη."
    });
  }

  try {
    const newTraining = await trainingService.create({
      description,
      location,
      from_date,
      to_date,
      personnel
    });
    res.status(201).json(newTraining);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Ανάκτηση όλων των εκπαιδεύσεων (με populate προσωπικού)
exports.getTrainingRecords = async (req, res) => {
  try {
    const trainingRecords = await trainingService.findAll();
    res.status(200).json(trainingRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Ανάκτηση για ημερολόγιο
exports.getAllTrainingsForCalendar = async (req, res) => {
  try {
    const records = await trainingService.findAll();

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

// ✅ Ενημέρωση εκπαίδευσης
exports.updateTraining = async (req, res) => {
  try {
    const updated = await trainingService.update(req.params.id, req.body);
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
    const deleted = await trainingService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Δεν βρέθηκε εκπαίδευση" });
    }
    res.json({ message: "Η εκπαίδευση διαγράφηκε επιτυχώς" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
