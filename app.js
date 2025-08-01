// 📦 Import βιβλιοθηκών
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const winston = require('winston');

// Φορτώνει μεταβλητές περιβάλλοντος (.env)
dotenv.config();

// 📋 Logger με Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

// 🚀 Δημιουργία Express app
const app = express();

// 🌐 Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// 📡 Σύνδεση με MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info('✅ MongoDB connected'))
  .catch((err) => logger.error('❌ Error connecting to MongoDB: ' + err.message));

// 🔐 JWT Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(403).json({ message: 'Access denied.' });

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

// 🧭 Swagger τεκμηρίωση
require('./swagger')(app);

// 📦 Routes
app.use('/api/uploads', require('./routes/upload.routes'));
app.use('/api/personnel', require('./routes/personnelRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/service', require('./routes/serviceRoutes'));
app.use('/api/training', require('./routes/trainingRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// 🔒 Προστατευμένη route για δοκιμή JWT
app.use('/api/protected', authenticateJWT, (req, res) => {
  res.send('🔐 This is a protected route');
});

// ❗ Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack || err.message);
  res.status(500).json({ message: '⚠️ Something went wrong!' });
});

// ✅ Εξαγωγή app για χρήση σε server.js και tests
module.exports = app;
