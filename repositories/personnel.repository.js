const Personnel = require('../models/Personnel');

module.exports = {
  findAll({ filter = {}, select = null, sort = { createdAt: -1 }, skip = 0, limit = 50 } = {}) {
    return Personnel.find(filter)
      .select(select)
      .populate('service trainings')
      .sort(sort)
      .skip(skip)
      .limit(limit);
  },

  findById(id) {
    return Personnel.findById(id).populate('service trainings');
  },

  create(data) {
    const doc = new Personnel(data);
    return doc.save();
  },

  update(id, data, options = { new: true, runValidators: true }) {
    return Personnel.findByIdAndUpdate(id, data, options).populate('service trainings');
  },

  remove(id) {
    return Personnel.findByIdAndDelete(id);
  },

  count(filter = {}) {
    return Personnel.countDocuments(filter);
  },
};
