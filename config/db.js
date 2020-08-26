const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    mongoose.connection.on("error", () => {
      throw new Error(`unable to connect to database: ${config.mongoUri}`);
    });
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
