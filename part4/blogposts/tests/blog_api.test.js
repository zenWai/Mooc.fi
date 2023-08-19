const mongoose = require('mongoose');
const Blog = require('../models/post');
const supertest = require('supertest');
const app = require('../app'); // Your express app
const api = supertest(app);
const helper = require('../utils/list_helper');
const User = require('../models/user');

describe('Blog API', () => {
  let blogsAtStart;
  let token;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    const testUser = {
      username: 'yourTestUsername',
      password: 'yourTestPassword',
      name: 'Test User'
    };

    // Register the user first
    await api
      .post('/api/users')
      .send(testUser)
      .expect(200);

    // Define userCredentials for login
    const userCredentials = {
      username: testUser.username,
      password: testUser.password
    };

    const response = await api
      .post('/api/login')
      .send(userCredentials)
      .expect(200);

    token = response.body.token;

    // Sample blog post
    const sampleBlog = new Blog({
      title: 'Sample Blog',
      author: 'Sample Author',
      url: 'http://sample.url',
      likes: 5
    });

    await sampleBlog.save();
    blogsAtStart = await Blog.find({});
  });


  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blog posts have id property', async () => {
    const blogsAtStart = await Blog.find({});
    const blogToView = blogsAtStart[0];
    expect(blogToView.id).toBeDefined();
  });

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.url',
      likes: 7
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await Blog.find({});
    const titles = blogsAtEnd.map(b => b.title);

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
    expect(titles).toContain('Test Blog');
  });

  test('adding a blog fails with status code 401 Unauthorized if token is not provided', async () => {
    // Define a new blog
    const newBlog = {
      title: 'Test Blog Without Token',
      author: 'Anonymous Author',
      url: 'http://no-token-blog.com',
      likes: 5
    };

    // Try to add the blog without providing a token
    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);

    // Check if the response body contains the expected error message
    // (Server returns a specific error message 'token missing')
    expect(result.body.error).toBe('token missing');

    // To ensure the blog wasn't added, fetch all blogs and check that the new blog isn't among them
    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).not.toContain(newBlog.title);
  });

  test('likes default to 0 if missing', async () => {
    const newBlog = {
      title: 'Test Blog 2',
      author: 'Test Author',
      url: 'http://test2.url'
    };

    const resultBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(resultBlog.body.likes).toBe(0);
  });

  test('blog without title or url is not added', async () => {
    const newBlog = {
      author: 'Missing Title and URL'
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test('a blog can be deleted', async () => {
    const testUser = {
      username: 'deleteTestUsername',
      password: 'deleteTestPassword',
      name: 'Delete User'
    };

    // Register the user
    await api.post('/api/users').send(testUser);

    // Login and get the token
    const response = await api.post('/api/login').send({
      username: testUser.username,
      password: testUser.password
    });
    const token = response.body.token;

    // 1. Get the initial count of blogs
    const initialLength = (await helper.blogsInDb()).length;

    // 2. Add a new blog using the API
    const newBlogData = {
      title: 'Test Blog for Deletion',
      author: 'Test Author',
      url: 'http://testblog.com',
      likes: 1
    };
    const addedBlogResponse = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogData)
      .expect(201);
    const newBlog = addedBlogResponse.body;

    // 3. Confirm that the number of blogs has increased by 1
    const afterAddingBlogLength = (await helper.blogsInDb()).length;
    expect(afterAddingBlogLength).toBe(initialLength + 1);

    // 4. Delete the newly added blog
    await api.delete(`/api/blogs/${newBlog.id}`).set('Authorization', `Bearer ${token}`).expect(204);

    // 5. Confirm that the number of blogs has decreased by 1
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialLength);
  });

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlogData = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedBlogData)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id);

    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

});