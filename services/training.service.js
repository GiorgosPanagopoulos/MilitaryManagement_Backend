const TrainingRecord = require('../models/TrainingRecord');

exports.findAll = async () => {
  return await TrainingRecord.find();
};

exports.findById = async (id) => {
  return await TrainingRecord.findById(id);
};

exports.create = async (data) => {
  const training = new TrainingRecord(data);
  return await training.save();
};

exports.update = async (id, data) => {
  return await TrainingRecord.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
  return await TrainingRecord.findByIdAndDelete(id);
};