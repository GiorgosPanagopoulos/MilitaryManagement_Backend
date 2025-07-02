// models/TrainingRecord.js
const mongoose = require('mongoose');

const TrainingRecordSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
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
    required: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('TrainingRecord', TrainingRecordSchema);
