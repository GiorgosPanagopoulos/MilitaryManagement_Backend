const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Ανάκτηση του header Authorization (π.χ. Bearer <token>)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Παίρνει το δεύτερο κομμάτι

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    // Επαλήθευση JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded; // Το decoded περιέχει userId και role

    next(); // Συνέχισε στο επόμενο middleware ή controller
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
