const postsRouter = require('express').Router();
const Blog = require('../models/post');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

postsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    response.json(blogs);
  } catch (error) {
    response.status(500).send({ error: 'Something went wrong.' });
  }
});

postsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).send({ error: 'Title or URL missing' });
  }

  // No need to extract token here. The middleware does it
  if (!request.token) {
    return response.status(401).send({ error: 'Token missing' });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  } catch (error) {
    return response.status(401).send({ error: 'Token invalid or expired' });
  }

  // Fetch the user using the ID from the decoded token
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(401).send({ error: 'User not found or token invalid' });
  }

  try {
    const blog = new Blog({
      ...request.body,
      user: user._id  // Set the user's ID as the creator of this blog post
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);  // Link this blog post to the user
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).send({ error: 'Failed to create a new post.' });
  }
});

postsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  if (!request.user) {
    return response.status(401).json({ error: 'User not authenticated' });
  }

  if (!blog.user || blog.user.toString() !== request.user._id.toString()) {
    return response.status(401).json({ error: 'Only the creator can delete this blog' });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

postsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body;

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updatedBlog);
  } catch (error) {
    response.status(400).send({ error: 'Something went wrong.' });
  }
});

module.exports = postsRouter;