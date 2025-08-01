// models/TrainingRecord.js
const mongoose = require('mongoose');

const TrainingRecordSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    index: true, // ✅ Προσθήκη index για γρήγορη αναζήτηση
  },
  location: {
    type: String,
    required: true,
    trim: true,
    index: true, // ✅ Προσθήκη index για grouping/στατιστικά
  },
  from_date: {
    type: Date,
    required: true,
  },
  to_date: {
    type: Date,
    required: true,
  },
  personnel: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Personnel',
      required: true,
    },
  ],
  success_rate: {
    type: Number,
    min: 0,
    max: 100,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('TrainingRecord', TrainingRecordSchema);
