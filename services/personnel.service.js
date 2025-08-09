//const Personnel = require('../models/Personnel');//
const { personnelRepository } = require('../repositories');
personnelRepository.findAll();

exports.findAll = async () => {
  return await Personnel.find().populate('service').populate('trainings');
};

exports.findById = async (id) => {
  return await Personnel.findById(id).populate('service').populate('trainings');
};

exports.create = async (data) => {
  const personnel = new Personnel(data);
  return await personnel.save();
};

exports.update = async (id, data) => {
  return await Personnel.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
  return await Personnel.findByIdAndDelete(id);
};