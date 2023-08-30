const testingRouter = require('express').Router();
const Blog = require('../models/post');
const User = require('../models/user');

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;