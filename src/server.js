const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./common/logger');
const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./common/config');
mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  logger.info("we're connected!");
  app.listen(PORT, () => {
    logger.info(`App is running on http://localhost:${PORT}`);
  });
});
