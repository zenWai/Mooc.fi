const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  // Handle the error and respond accordingly...

  next(error);
};

// Add more middlewares as needed

module.exports = {
  errorHandler,
  // ... other middlewares
};