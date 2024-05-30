const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGO_URI || "mongodb://localhost:27017/movieLib";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(URI);
    console.log("DB Connected Successfully ✅");
    return con;
  } catch (e) {
    console.log(`Authentication to database failed ❗`);
    process.exit(1);
  }
};

module.exports = { connectDB };