const errorHandlerMiddleware = (err, req, res, next) => {
  //   if (res.headersSent) {
  //     return next(err);
  //   }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(err.status).json({ msg: err.message });
};

module.exports = errorHandlerMiddleware;
