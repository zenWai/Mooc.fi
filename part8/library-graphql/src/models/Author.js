const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Author name must be unique'],
    required: [true, 'Author name is required'],
    minlength: [4, 'Author name must be at least 4 characters long']
  },
  born: {
    type: Number
  }
});

authorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Author', authorSchema)