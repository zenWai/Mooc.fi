const Blog = require('../models/post');
const jwt = require('jsonwebtoken');

const dummy = (blogs) => {
  return 1;
};

const blogsInDb = async () => {
  return await Blog.find({});
};

const getUserFromToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    throw new Error('Token missing or invalid');
  }
  return decodedToken;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

// blog with the most likes from the list of blogs
const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes));
  const favorite = blogs.find(blog => blog.likes === maxLikes);

  return favorite
    ? {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
    : null;
};

// author with the most number of blogs
const mostBlogs = (blogs) => {
  const authors = {};

  blogs.forEach(blog => {
    authors[blog.author] = (authors[blog.author] || 0) + 1;
  });

  const mostBlogsAuthor = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b);

  return mostBlogsAuthor
    ? {
      author: mostBlogsAuthor,
      blogs: authors[mostBlogsAuthor]
    }
    : null;
};

const mostLikes = (blogs) => {
  const authors = {};

  blogs.forEach(blog => {
    authors[blog.author] = (authors[blog.author] || 0) + blog.likes;
  });

  const mostLikedAuthor = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b);

  return mostLikedAuthor
    ? {
      author: mostLikedAuthor,
      likes: authors[mostLikedAuthor]
    }
    : null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogsInDb,
  getUserFromToken
};