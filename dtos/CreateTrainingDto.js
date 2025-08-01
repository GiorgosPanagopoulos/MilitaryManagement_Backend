module.exports = function validateCreateTraining(data) {
  const { training_name, from_date, to_date, location, success_rate } = data;
  if (!training_name || !from_date || !to_date || !location || success_rate == null) {
    throw new Error("Όλα τα πεδία training_name, from_date, to_date, location, success_rate είναι υποχρεωτικά.");
  }
  return data;
};