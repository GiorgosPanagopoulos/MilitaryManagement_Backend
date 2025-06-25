module.exports = function validateCreatePersonnel(data) {
  const { name, rank, service, startDate } = data;
  if (!name || !rank || !service || !startDate) {
    throw new Error("Όλα τα πεδία name, rank, service, startDate είναι υποχρεωτικά.");
  }
  return data;
};