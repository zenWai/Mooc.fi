const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, 'Username must be unique'],
    required: [true, 'Username is required'],
    minlength: [3, 'Username must be at least 3 characters long']
  },
});

module.exports = mongoose.model('User', userSchema);