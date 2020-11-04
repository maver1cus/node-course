const express = require('express');
const swaggerUI = require('swagger-ui-express');
const jwt = require('jsonwebtoken');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/board/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const errorHandler = require('./utils/error-handler');
const morgan = require('morgan');
const logger = require('./common/logger');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const HTTP_STATUS_CODE = require('./utils/http-status-codes');
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.sendStatus(HTTP_STATUS_CODE.UNAUTHORIZED);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}

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
app.use('/login', loginRouter);
app.use(authenticateToken);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

module.exports = app;
