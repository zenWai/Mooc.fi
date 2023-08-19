const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const postsRouter = require('./controllers/posts');
const app = express();

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error('error connecting to MongoDB:', error.message));

app.use(cors());
app.use(express.json());

morgan.token('bodyData', (req) => (req.body ? JSON.stringify(req.body) : ''));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyData'));

app.use('/api/blogs', postsRouter);

app.use(middleware.errorHandler);

module.exports = app;