const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to MongoDB');

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Check if phone number is of length 8 or more
        if (v.length < 8) return false;

        // splits the phone number by
        const parts = v.split('-');

        // 2 parts only Number-Number
        if (parts.length !== 2) return false;
        // This checks if the first part consists of 2 or 3 digits.
        if (!/^\d{2,3}$/.test(parts[0])) return false;
        // This checks if the second part consists only of digits.
        if (!/^\d+$/.test(parts[1])) return false;

        return true;
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema)