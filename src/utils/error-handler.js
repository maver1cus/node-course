const logger = require('../common/logger');
const HTTP_STATUS_CODE = require('./http-status-codes');

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    logger.error(err.message);
    res.status(err.status).send(err.message);
  } else {
    logger.error('Server Error');
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send('Server Error');
  }
  next();
};

module.exports = errorHandler;
