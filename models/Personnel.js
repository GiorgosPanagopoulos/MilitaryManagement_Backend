// models/Personnel.js
const mongoose = require('mongoose');

const PersonnelSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  rank: { type: String, required: true },
  serviceNumber: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  unit: { type: String, required: true },
  document: { type: String }, // Για πτυχίο/βεβαίωση
});

module.exports = mongoose.model('Personnel', PersonnelSchema);
