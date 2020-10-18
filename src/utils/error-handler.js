const HTTP_STATUS_CODE = require('./http-status-codes');

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send('Server Error');
  }
  next();
};

module.exports = errorHandler;
