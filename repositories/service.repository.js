const Service = require('../models/Service');

module.exports = {
  findAll({ filter = {}, select = null, sort = { name: 1 }, skip = 0, limit = 100 } = {}) {
    return Service.find(filter).select(select).sort(sort).skip(skip).limit(limit);
  },

  findById(id) {
    return Service.findById(id);
  },

  create(data) {
    const doc = new Service(data);
    return doc.save();
  },

  update(id, data, options = { new: true, runValidators: true }) {
    return Service.findByIdAndUpdate(id, data, options);
  },

  remove(id) {
    return Service.findByIdAndDelete(id);
  },

  count(filter = {}) {
    return Service.countDocuments(filter);
  },
};
