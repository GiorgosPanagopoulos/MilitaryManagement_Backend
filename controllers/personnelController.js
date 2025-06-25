const Personnel = require('../models/Personnel');  // Εισαγωγή του μοντέλου του προσωπικού

// Ανάκτηση προσωπικών δεδομένων στρατιωτικού
exports.getPersonnelById = async (req, res) => {
  const { id } = req.params;  // Ανάκτηση του ID από τα παραμέτρους του URL
  try {
    // Αναζητούμε το στρατιωτικό προσωπικό με το συγκεκριμένο ID
    const personnel = await Personnel.findById(id)
      .populate('training_records')  // Ανάκτηση των εκπαιδεύσεων που σχετίζονται με το προσωπικό
      .populate('services');         // Ανάκτηση των υπηρεσιών που σχετίζονται με το προσωπικό

    if (!personnel) {
      return res.status(404).json({ message: 'Personnel not found' });  // Αν δεν βρεθεί το προσωπικό, επιστρέφουμε σφάλμα
    }

    res.status(200).json(personnel);  // Επιστροφή των δεδομένων του προσωπικού
  } catch (err) {
    res.status(500).json({ message: err.message });  // Αν υπάρξει σφάλμα, επιστρέφουμε το μήνυμα σφάλματος
  }
};

// Ενημέρωση προσωπικών δεδομένων στρατιωτικού
exports.updatePersonnel = async (req, res) => {
  const { id } = req.params;  // Ανάκτηση του ID από τα παραμέτρους του URL
  const { name, rank, unit, position } = req.body;  // Ανάκτηση των νέων δεδομένων από το σώμα του αιτήματος
  try {
    // Αναζητούμε και ενημερώνουμε το στρατιωτικό προσωπικό με το συγκεκριμένο ID
    const updatedPersonnel = await Personnel.findByIdAndUpdate(
      id,  // Το ID του προσωπικού που θέλουμε να ενημερώσουμε
      { name, rank, unit, position },  // Τα νέα δεδομένα για το προσωπικό
      { new: true }  // Η επιλογή new:true εξασφαλίζει ότι θα επιστραφεί το ενημερωμένο έγγραφο
    );

    if (!updatedPersonnel) {
      return res.status(404).json({ message: 'Personnel not found' });  // Αν δεν βρεθεί το προσωπικό, επιστρέφουμε σφάλμα
    }

    res.status(200).json(updatedPersonnel);  // Επιστρέφουμε το ενημερωμένο προσωπικό
  } catch (err) {
    res.status(500).json({ message: err.message });  // Αν υπάρξει σφάλμα, επιστρέφουμε το μήνυμα σφάλματος
  }
};

// Δημιουργία νέου στρατιωτικού προσωπικού
exports.createPersonnel = async (req, res) => {
  const { name, rank, unit, date_of_birth, position } = req.body;  // Ανάκτηση των δεδομένων του νέου προσωπικού
  try {
    const newPersonnel = new Personnel({
      name,
      rank,
      unit,
      date_of_birth,
      position
    });

    // Αποθήκευση του νέου προσωπικού στη βάση δεδομένων
    await newPersonnel.save();
    res.status(201).json(newPersonnel);  // Επιστρέφουμε το νέο προσωπικό
  } catch (err) {
    res.status(500).json({ message: err.message });  // Αν υπάρξει σφάλμα, επιστρέφουμε το μήνυμα σφάλματος
  }
};

// Αφαίρεση στρατιωτικού προσωπικού
exports.deletePersonnel = async (req, res) => {
  const { id } = req.params;  // Ανάκτηση του ID από τα παραμέτρους του URL
  try {
    const personnel = await Personnel.findByIdAndDelete(id);  // Αναζητούμε και διαγράφουμε το προσωπικό

    if (!personnel) {
      return res.status(404).json({ message: 'Personnel not found' });  // Αν δεν βρεθεί το προσωπικό, επιστρέφουμε σφάλμα
    }

    res.status(200).json({ message: 'Personnel deleted successfully' });  // Επιβεβαίωση της διαγραφής
  } catch (err) {
    res.status(500).json({ message: err.message });  // Αν υπάρξει σφάλμα, επιστρέφουμε το μήνυμα σφάλματος
  }
};
