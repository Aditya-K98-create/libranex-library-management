const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/issues", require("./routes/issueRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// MongoDB Connection FIRST
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    // Routes AFTER DB connection
    app.use("/api/users", require("./routes/userRoutes"));
    app.use("/api/books", require("./routes/bookRoutes"));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
