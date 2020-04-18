const mongoose = require('mongoose');

const connectDB = (server) => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0-jtuqz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => server)
    .catch((err) => console.log('err happened in db connection!', err));
};

module.exports = connectDB;
