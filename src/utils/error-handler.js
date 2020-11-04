const logger = require('../common/logger');
const NotFoundError = require('../utils/not-found-error');
const ForbiddenError = require('../utils/forbidden-error');
const HTTP_STATUS_CODE = require('./http-status-codes');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (err instanceof NotFoundError) {
    res.status(err.status).send(err.message);
  } else if (err instanceof ForbiddenError) {
    res.status(err.status).send(err.message);
  } else {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send('Internal Server Error');
  }
  next();
};

module.exports = errorHandler;
