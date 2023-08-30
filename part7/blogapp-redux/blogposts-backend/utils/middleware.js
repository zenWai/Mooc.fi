const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  // add more?

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// kinda does same as morgan
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  logger.info('---');
  next();
};

const tokenExtractor = (request, response, next) => {
  // Extract the token from the Authorization header
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;

  if (!token) {
    return response.status(401).json({ error: 'token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(401).json({ error: 'User not found' });
    }

    request.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return response.status(401).json({ error: 'token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'invalid token' });
    }
    if (error.name === 'NotBeforeError') {
      return response.status(401).json({ error: 'token not active yet' });
    }
    next(error);
  }
};


module.exports = {
  errorHandler,
  unknownEndpoint,
  requestLogger,
  tokenExtractor,
  userExtractor
};