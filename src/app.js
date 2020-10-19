const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/board/board.router');
const taskRouter = require('./resources/tasks/task.router');
const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');
const logger = require('./common/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(
  morgan(
    ':method :status :url Query :query Body :body size :res[content-length] - :response-time ms',
    {
      stream: logger.stream
    }
  )
);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

process.on('uncaughtException', error => {
  const exit = process.exit;
  logger.error(
    `[Inside 'uncaughtException' event] ${error.stack} ${error.message}`,
    exit(1)
  );
});

process.on('unhandledRejection', (reason, p) => {
  const exit = process.exit;
  logger.error(`Unhandled Rejection at: Promise ${p} reason: #${reason}`, () =>
    exit(1)
  );
});

module.exports = app;
