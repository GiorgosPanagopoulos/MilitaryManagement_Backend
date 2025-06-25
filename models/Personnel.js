// models/Personnel.js
const mongoose = require('mongoose');

const PersonnelSchema = new mongoose.Schema({
  document: { type: String },
  name: { type: String, required: true },
  rank: { type: String, required: true },
  unit: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  position: { type: String, required: true },
  training_records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrainingRecord' }],
  deployments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deployment' }],
});

module.exports = mongoose.model('Personnel', PersonnelSchema);
