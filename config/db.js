const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
console.log("URI:", process.env.MONGO_URI_UI);

const connectDB = async () => {
  try {
    console.log("🔗 Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI_UI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;