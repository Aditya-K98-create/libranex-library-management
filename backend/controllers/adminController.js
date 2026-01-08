const Book = require("../models/Book");
const Issue = require("../models/Issue");
const User = require("../models/User");

const getAdminStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();

    const issuedBooks = await Issue.countDocuments({
      returned: false,
    });

    const returnedBooks = await Issue.countDocuments({
      returned: true,
    });

    const users = await User.countDocuments();

    res.json({
      totalBooks,
      issuedBooks,
      returnedBooks,
      users,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Failed to load admin stats" });
  }
};

module.exports = { getAdminStats };
