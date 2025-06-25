// Import βιβλιοθηκών
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const winston = require('winston');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Φορτώνουμε .env μεταβλητές
dotenv.config();

// Δημιουργία logger ΠΡΙΝ χρησιμοποιηθεί
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

// Δημιουργία Express app
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Σύνδεση με MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => logger.info('MongoDB connected'))
.catch((err) => logger.error('Error connecting to MongoDB:', err));

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Military Management API',
      description: 'API for managing military personnel',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware αυθεντικοποίησης JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'Access denied.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    req.user = user;
    next();
  });
};

// Routes
const personnelRoutes = require('./routes/personnelRoutes');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const trainingRoutes = require('./routes/trainingRoutes');
const uploadRoutes = require('./routes/upload.routes');

app.use('/api/uploads', uploadRoutes);
app.use('/api/personnel', personnelRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/training', trainingRoutes);

// Προστατευμένη διαδρομή
app.use('/api/protected', authenticateJWT, (req, res) => {
  res.send('This is a protected route');
});

// Γενικός handler λαθών
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Εκκίνηση server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
