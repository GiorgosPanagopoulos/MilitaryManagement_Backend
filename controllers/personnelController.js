const Personnel = require('../models/Personnel');

// ✅ Ανάκτηση όλων των στρατιωτικών
const getAllPersonnel = async (req, res) => {
  try {
    const personnel = await Personnel.find();
    res.json(personnel);
  } catch (err) {
    console.error('Error in getAllPersonnel:', err);
    res.status(500).json({ message: 'Error retrieving personnel' });
  }
};

// ✅ Δημιουργία νέου στρατιωτικού
const createPersonnel = async (req, res) => {
  try {
    const newPerson = new Personnel(req.body);
    const saved = await newPerson.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error in createPersonnel:', err);
    res.status(500).json({ message: 'Error creating personnel' });
  }
};

// ✅ Ανάκτηση στρατιωτικού βάσει ID
const getPersonnelById = async (req, res) => {
  try {
    const person = await Personnel.findById(req.params.id);
    if (!person) return res.status(404).json({ message: 'Personnel not found' });
    res.json(person);
  } catch (err) {
    console.error('Error in getPersonnelById:', err);
    res.status(500).json({ message: 'Error retrieving personnel' });
  }
};

// ✅ Ενημέρωση στρατιωτικού βάσει ID
const updatePersonnel = async (req, res) => {
  try {
    const updated = await Personnel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: 'Personnel not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error in updatePersonnel:', err);
    res.status(500).json({ message: 'Error updating personnel' });
  }
};

// ✅ Διαγραφή στρατιωτικού (admin only)
const deletePersonnel = async (req, res) => {
  try {
    const deleted = await Personnel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Personnel not found' });
    res.json({ message: 'Personnel deleted successfully' });
  } catch (err) {
    console.error('Error in deletePersonnel:', err);
    res.status(500).json({ message: 'Error deleting personnel' });
  }
};

module.exports = {
  getAllPersonnel,
  createPersonnel,
  getPersonnelById,
  updatePersonnel,
  deletePersonnel,
};
