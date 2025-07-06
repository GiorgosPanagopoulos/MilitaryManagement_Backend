const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Personnel = require('../models/Personnel');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://george6627:7qKWuXYsSGf39NfC@cluster0.7dre2.mongodb.net/military_management?retryWrites=true&w=majority';

const seedPersonnel = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    const samplePersonnel = [
      {
        firstName: 'Νίκος',
        lastName: 'Παπαδόπουλος',
        rank: 'Πλοίαρχος',
        serviceNumber: 'PN123456',
        phone: '6941234567',
        email: 'nikos.papadopoulos@navy.mil',
        unit: 'Διοίκηση Φρεγατών',
      },
      {
        firstName: 'Ελένη',
        lastName: 'Γεωργίου',
        rank: 'Ανθυποπλοίαρχος',
        serviceNumber: 'PN654321',
        phone: '6977654321',
        email: 'eleni.georgiou@navy.mil',
        unit: 'Υποβρύχια',
      },
      {
        firstName: 'Γιώργος',
        lastName: 'Αναγνώστου',
        rank: 'Σημαιοφόρος',
        serviceNumber: 'PN998877',
        phone: '6983344556',
        email: 'giorgos.anagnostou@navy.mil',
        unit: 'ΔΝΕ',
      },
    ];

    await Personnel.deleteMany({});
    await Personnel.insertMany(samplePersonnel);
    console.log('✅ Sample personnel inserted');

    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error inserting personnel:', error);
  }
};

seedPersonnel();
