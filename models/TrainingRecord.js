// models/TrainingRecord.js
const mongoose = require('mongoose');

// Ορισμός του Schema για το μοντέλο TrainingRecord
const TrainingRecordSchema = new mongoose.Schema({
  training_name: { 
    type: String, 
    required: true, 
    trim: true  // Διασφαλίζει ότι τα κενά θα αφαιρούνται από το όνομα της εκπαίδευσης
  },
  training_date: { 
    type: Date, 
    required: true 
  },
  success_rate: { 
    type: Number, 
    required: true, 
    min: 0,  // Ελάχιστο ποσοστό επιτυχίας: 0%
    max: 100 // Μέγιστο ποσοστό επιτυχίας: 100%
  },
  description: {
    type: String,
    trim: true // Αφαίρεση κενών πριν και μετά την περιγραφή
  },
  trainer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trainer', // Αν θέλεις να συνδέσεις τον εκπαιδευτή με το μοντέλο 'Trainer'
    required: false  // Αν το πεδίο είναι προαιρετικό
  }
}, {
  timestamps: true // Αυτό θα προσθέσει πεδία 'createdAt' και 'updatedAt'
});

// Δημιουργία και εξαγωγή του μοντέλου TrainingRecord
module.exports = mongoose.model('TrainingRecord', TrainingRecordSchema);
