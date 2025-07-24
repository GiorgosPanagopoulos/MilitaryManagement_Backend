const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // αφαιρεί κενά αρχής/τέλους
    lowercase: true // αποτρέπει διπλότυπα με κεφαλαία
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // μπορείς να αυξήσεις αν θέλεις
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  name: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // προσθέτει createdAt & updatedAt
});

module.exports = mongoose.model('User', userSchema);
