const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ======================
// MIDDLEWARES
// ======================
app.use(cors());
app.use(express.json());

// ======================
// DATABASE CONNECTION
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// ======================
// ROUTES
// ======================
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/issues", require("./routes/issueRoutes"));

// ======================
// DEFAULT ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("📚 Library Management System API Running");
});

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
