const express = require("express");
const router = express.Router();

const { getAdminStats } = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// 📊 Admin Dashboard Stats
router.get("/stats", protect, adminOnly, getAdminStats);

module.exports = router;
