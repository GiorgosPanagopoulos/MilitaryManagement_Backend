const Service = require('../models/Service');

exports.findAll = async () => {
  return await Service.find();
};

exports.findById = async (id) => {
  return await Service.findById(id);
};

exports.create = async (data) => {
  const service = new Service(data);
  return await service.save();
};

exports.update = async (id, data) => {
  return await Service.findByIdAndUpdate(id, data, { new: true });
};

exports.remove = async (id) => {
  return await Service.findByIdAndDelete(id);
};