const morgan = require('morgan');
const path = require('path');
const winston = require('winston');
const { combine, timestamp, prettyPrint } = winston.format;

const LOGS_DIR = path.join(__dirname, '../../logs');

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('query', req => JSON.stringify(req.query));

const format = combine(timestamp(), prettyPrint());

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      format,
      level: 'info',
      filename: `${LOGS_DIR}/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 1024 * 5000,
      maxFiles: 5
    }),
    new winston.transports.File({
      format,
      level: 'error',
      filename: `${LOGS_DIR}/errors.log`,
      json: true,
      maxsize: 1024 * 5000,
      maxFiles: 5
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
      handleExceptions: true,
      colorize: true
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      format,
      level: 'error',
      filename: `${LOGS_DIR}/exceptions.log`,
      handleExceptions: true,
      json: true,
      maxsize: 1024 * 5000,
      maxFiles: 5
    })
  ],
  exitOnError: false
});

logger.stream = {
  write: message => logger.info(message)
};

module.exports = logger;
