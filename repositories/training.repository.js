const TrainingRecord = require('../models/TrainingRecord');

module.exports = {
  findAll({ filter = {}, select = null, sort = { from_date: -1 }, skip = 0, limit = 50 } = {}) {
    return TrainingRecord.find(filter)
      .select(select)
      .populate('personnel')
      .sort(sort)
      .skip(skip)
      .limit(limit);
  },

  findById(id) {
    return TrainingRecord.findById(id).populate('personnel');
  },

  create(data) {
    const doc = new TrainingRecord(data);
    return doc.save();
  },

  update(id, data, options = { new: true, runValidators: true }) {
    return TrainingRecord.findByIdAndUpdate(id, data, options).populate('personnel');
  },

  remove(id) {
    return TrainingRecord.findByIdAndDelete(id);
  },

  count(filter = {}) {
    return TrainingRecord.countDocuments(filter);
  },
};
