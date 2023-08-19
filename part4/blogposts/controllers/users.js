const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  const body = req.body;
  // Check if both username and password are given
  if (!body.username || !body.password) {
    return res.status(400).json({ error: 'username and password must be given' });
  }
  // Check if both username and password are at least 3 characters long
  if (body.username.length < 3 || body.password.length < 3) {
    return res.status(400).json({ error: 'both username and password must be at least 3 characters long' });
  }

  const passwordHash = await User.hashPassword(body.password);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    // Catch error from unique validation in the schema
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ error: 'username must be unique' });
    }
    res.status(400).json({ error: error.message });
  }
});

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, author: 1 });
  res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = usersRouter;