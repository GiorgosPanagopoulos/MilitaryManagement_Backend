module.exports = function (validatorFn) {
  return (req, res, next) => {
    try {
      validatorFn(req.body);
      next();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
};