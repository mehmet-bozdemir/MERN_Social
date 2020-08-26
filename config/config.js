const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb+srv://mern123:mern123@cluster0.dx413.mongodb.net/mern123?retryWrites=true&w=majority"
};

module.exports = config;
