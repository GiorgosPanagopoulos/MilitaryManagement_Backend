const TrainingRecord = require('../models/TrainingRecord');

exports.findAll = async () => {
  return await TrainingRecord.find().populate('personnel', 'firstName lastName rank');
};

exports.findById = async (id) => {
  return await TrainingRecord.findById(id).populate('personnel', 'firstName lastName rank');
};

exports.create = async (data) => {
  const training = new TrainingRecord(data);
  return await training.save();
};

exports.update = async (id, data) => {
  return await TrainingRecord.findByIdAndUpdate(id, data, { new: true })
    .populate('personnel', 'firstName lastName rank');
};

exports.remove = async (id) => {
  return await TrainingRecord.findByIdAndDelete(id);
};