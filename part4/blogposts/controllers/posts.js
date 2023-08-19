const postsRouter = require('express').Router();
const Blog = require('../models/post');

postsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs);
  });
});

postsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);
  blog.save().then(result => {
    response.status(201).json(result);
  });
});

module.exports = postsRouter;