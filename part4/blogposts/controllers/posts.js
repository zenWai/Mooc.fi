const postsRouter = require('express').Router();
const Blog = require('../models/post');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

postsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    // Since userExtractor has already populated request.user, just use it
    const user = request.user;
    const transformedBlogs = blogs.map(blog => ({
      ...blog.toJSON(),
      hasLiked: blog.likedBy.includes(user._id)
    }));

    response.json(transformedBlogs);
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

  let user = request.user;
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
  try {

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
  } catch (error) {
    response.status(400).send({ error: 'Something went wrong.' });
  }
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

postsRouter.put('/:id/like', async (request, response) => {
  try {
    // First, fetch the existing blog from the database
    const existingBlog = await Blog.findById(request.params.id);

    if (!existingBlog) {
      return response.status(404).send({ error: 'Blog not found.' });
    }

    if (!request.token) {
      return response.status(401).send({ error: 'Token missing' });
    }

    const user = request.user;
    if (!user) {
      return response.status(401).send({ error: 'User not found or token invalid' });
    }

    // Check if the user has already liked the blog
    const hasLiked = existingBlog.likedBy.includes(user._id);

    // If they have liked it already, unlike it. Otherwise, like it.
    if (hasLiked) {
      existingBlog.likes -= 1;
      existingBlog.likedBy = existingBlog.likedBy.filter(userId => userId.toString() !== user._id.toString());
    } else {
      existingBlog.likes += 1;
      existingBlog.likedBy.push(user._id);
    }

    // Save the modified blog
    await existingBlog.save();

    response.json(existingBlog);
  } catch (error) {
    response.status(400).send({ error: 'Something went wrong.' });
  }
});

module.exports = postsRouter;