const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  personnel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Personnel' }] // Σύνδεση με το στρατιωτικό προσωπικό
});

module.exports = mongoose.model('Service', ServiceSchema);
