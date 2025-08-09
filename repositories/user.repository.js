const User = require('../models/User');

module.exports = {
  findAll({ filter = {}, select = '-password', sort = { createdAt: -1 }, skip = 0, limit = 50 } = {}) {
    return User.find(filter).select(select).sort(sort).skip(skip).limit(limit);
  },

  findById(id) {
    return User.findById(id).select('-password');
  },

  findByEmail(email) {
    return User.findOne({ email });
  },

  create(data) {
    const doc = new User(data);
    return doc.save();
  },

  update(id, data, options = { new: true, runValidators: true }) {
    return User.findByIdAndUpdate(id, data, options).select('-password');
  },

  remove(id) {
    return User.findByIdAndDelete(id);
  },

  count(filter = {}) {
    return User.countDocuments(filter);
  },
};
