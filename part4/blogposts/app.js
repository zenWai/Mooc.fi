require('dotenv').config();
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const postsRouter = require('./controllers/posts');
const app = express();
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error('error connecting to MongoDB:', error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

morgan.token('bodyData', (req) => (req.body ? JSON.stringify(req.body) : ''));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyData'));

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', middleware.userExtractor, postsRouter);
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

// Handling unknown endpoints
app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;