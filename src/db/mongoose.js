const mongoose = require("mongoose");

const dbConnectionURL = "mongodb://127.0.0.1:27017";
const databasePath = "/learn-rest";

mongoose.connect(dbConnectionURL + databasePath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

module.exports = mongoose;
