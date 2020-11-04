const HTTP_STATUS_CODE = require('./http-status-codes');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_STATUS_CODE.FORBIDDEN;
    this.message = message || 'Forbidden';
  }
}

module.exports = ForbiddenError;
