const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Service = require('../models/Service');

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://george6627:7qKWuXYsSGf39NfC@cluster0.7dre2.mongodb.net/military_management?retryWrites=true&w=majority';

const seedServices = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

   const sampleServices = [
  {
    name: 'Διοίκηση Φρεγατών',
    location: 'Ναύσταθμος Σαλαμίνας',
    description: 'Διοίκηση μονάδων επιφανείας του Στόλου'
  },
  {
    name: 'Διοίκηση Υποβρυχίων',
    location: 'ΠΝ - Σκάλα Σαλαμίνας',
    description: 'Διοίκηση των υποβρυχίων του ΠΝ'
  }
];


    await Service.deleteMany({});
    await Service.insertMany(sampleServices);
    console.log('✅ Sample services inserted');

    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error inserting services:', error);
  }
};

seedServices();
