module.exports = function validateCreateService(data) {
  const { name, location } = data;
  if (!name || !location) {
    throw new Error("Τα πεδία name και location είναι υποχρεωτικά.");
  }
  return data;
};