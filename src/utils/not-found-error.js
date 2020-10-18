const HTTP_STATUS_CODE = require('./http-status-codes');

class NotFoundError extends Error {
  constructor(message) {
    super(message || 'Not Found');
    this.status = HTTP_STATUS_CODE.NOT_FOUND;
  }
}

module.exports = NotFoundError;
