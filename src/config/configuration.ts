export default () => ({
  port: parseInt(process.env.PORT || '9000', 10),
  mongoUri: process.env.MONGO_URI,
});
