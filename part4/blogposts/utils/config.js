require('dotenv').config();

const MONGODB_URI = process.env.MONGODBLOG_URI;
const PORT = 3006;

module.exports = {
  MONGODB_URI,
  PORT
};