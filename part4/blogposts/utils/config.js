let MONGODB_URI;

switch (process.env.NODE_ENV) {
case 'production':
  MONGODB_URI = process.env.MONGODBLOG_URI_PROD;
  break;
case 'test':
  MONGODB_URI = process.env.MONGODBLOG_URI_TEST;
  break;
default:
  MONGODB_URI = process.env.MONGODBLOG_URI_DEV;
}

const PORT = 3006;

module.exports = {
  MONGODB_URI,
  PORT
};