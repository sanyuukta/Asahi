require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const app = express();

/* =========================
   ENV VALIDATION
========================= */
if (!process.env.MONGO_URI && !process.env.MONGODB_URI) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

/* =========================
   MIDDLEWARE
========================= */

// 🔥 HELMET FIX (IMPORTANT FOR IMAGES)
app.use(
  helmet({
    crossOriginResourcePolicy: false   // 🔥 VERY IMPORTANT
  })
);

// 🔥 CORS FIX
app.use(cors({
  origin: true,
  credentials: true
}));

// body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// logger
app.use(morgan("dev"));

/* =========================
   STATIC FILES (🔥 IMAGE FIX)
========================= */

app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

/* =========================
   DATABASE CONNECTION
========================= */

const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  }
};

connectDB();

/* =========================
   ROUTES IMPORT
========================= */

const enquiryRoutes = require("./routes/enquiryRoutes");
const adminRoutes = require("./routes/adminRoutes");

/* =========================
   GLOBAL LOGGER
========================= */

app.use((req, res, next) => {
  console.log(`➡ ${req.method} ${req.originalUrl}`);
  next();
});

/* =========================
   API ROUTES
========================= */

app.use("/api/enquiry", enquiryRoutes);
app.use("/api/admin", adminRoutes);

/* =========================
   HEALTH CHECK
========================= */

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    server: "running",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
    time: new Date()
  });
});

/* =========================
   ROOT
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 ASAHI Backend Running Successfully"
  });
});

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route Not Found → ${req.originalUrl}`
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("=================================");
});