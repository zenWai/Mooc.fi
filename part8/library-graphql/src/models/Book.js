const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: [true, 'Book title must be unique'],
    required: [true, 'Book title is required'],
    minlength: [5, 'Book title must be at least 5 characters long']
  },
  published: {
    type: Number,
    required: [true, 'Publication year is required']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: [true, 'Author is required']
  },
  genres: [
    { type: String }
  ]
});

bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Book', bookSchema)