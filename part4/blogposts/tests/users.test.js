const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');
const api = supertest(app);

describe('when creating a new user', () => {

  beforeEach(async () => {
    await User.deleteMany({});  // clear the users collection before each test
  });

  test('succeeds with valid data', async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: 'testUser',
      password: 'testPass123',
      name: 'Test User'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('fails with status code 400 if no username is provided', async () => {
    const newUser = {
      password: 'pass1234',
      name: 'John Doe'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('fails with status code 400 if no password is provided', async () => {
    const newUser = {
      username: 'johnDoe',
      name: 'John Doe'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('fails with status code 400 if username is less than 3 characters', async () => {
    const newUser = {
      username: 'jd',
      password: 'pass1234',
      name: 'John Doe'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('fails with status code 400 if password is less than 3 characters', async () => {
    const newUser = {
      username: 'johnDoe',
      password: 'p1',
      name: 'John Doe'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('fails with status code 400 if username already exists', async () => {
    const userOne = {
      username: 'johnDoe',
      password: 'pass1234',
      name: 'John Doe'
    };

    // Create a user
    await api
      .post('/api/users')
      .send(userOne)
      .expect(200);

    // Try to create another user with same username
    const userTwo = {
      ...userOne,
      name: 'John Doe II'
    };

    await api
      .post('/api/users')
      .send(userTwo)
      .expect(400);
  });

  test('the returned user should not contain the password hash', async () => {
    const newUser = {
      username: 'testUser',
      password: 'testPass123',
      name: 'Test User'
    };

    await api.post('/api/users').send(newUser);

    const userAtEnd = await User.findOne({ username: 'testUser' });

    expect(userAtEnd).toBeDefined();

    const result = await api
      .get(`/api/users/${userAtEnd.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(result.body.passwordHash).not.toBeDefined();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

});