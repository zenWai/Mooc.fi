const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const TOKEN_EXPIRATION_TIME = '1h';
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: TOKEN_EXPIRATION_TIME }
  );

  const expirationTimestamp = Date.now() + 60 * 60 * 1000;  // Current time + 1 hour in milliseconds
  response
    .status(200)
    .send({
      token,
      expiration: expirationTimestamp,
      username: user.username,
      name: user.name,
      id: user._id.toString()
    });
});

module.exports = loginRouter;