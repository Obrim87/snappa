const errorHandler = (err, req, res, next) => {
  if (err.message) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

export default errorHandler;
