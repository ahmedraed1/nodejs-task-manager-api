// db/connect.js
const mongoose = require("mongoose");
require("dotenv").config(); // To load environment variables from a .env file

// MongoDB URI from environment variable
const dbURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI
    await mongoose.connect(dbURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
