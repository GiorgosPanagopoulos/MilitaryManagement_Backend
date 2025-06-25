const bcrypt = require('bcryptjs');
const User = require('../models/User');
const isAdmin = require('../middleware/isAdmin');
const express = require('express');
const router = express.Router();

// Παράδειγμα endpoint για login
router.post('/login', (req, res) => {
  // Κώδικας για την αυθεντικοποίηση του χρήστη
  res.status(200).send('Login endpoint');
});

// Παράδειγμα endpoint για register
router.post('/register', (req, res) => {
  // Κώδικας για την εγγραφή του χρήστη
  res.status(201).send('Register endpoint');
});

router.post('/register-admin', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, passwordHash: hashedPassword, role: 'admin' });
    await user.save();

    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating admin user' });
  }
});

module.exports = router;
