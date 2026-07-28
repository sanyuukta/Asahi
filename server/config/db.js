const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const connUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/asahiDB";
    await mongoose.connect(connUri);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log("❌ MongoDB Error:", error);
  }
}

module.exports = connectDB