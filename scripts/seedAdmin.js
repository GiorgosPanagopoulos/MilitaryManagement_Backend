const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const MONGO_URI = 'mongodb+srv://george6627:7qKWuXYsSGf39NfC@cluster0.7dre2.mongodb.net/military_management?retryWrites=true&w=majority';

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    const hashedPassword = await bcrypt.hash('12345678', 10);

    const adminUser = new User({
      username: 'admin',
      email: 'admin@milman.local',
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('✅ Admin user inserted');
    process.exit();
  } catch (error) {
    console.error('❌ Error inserting admin:', error);
    process.exit(1);
  }
};

seedAdmin();
