const express = require("express");
const router = express.Router();

const {
  issueBook,
  returnBook,
  getMyIssuedBooks,
} = require("../controllers/issueController");

const { protect } = require("../middleware/authMiddleware");

router.post("/issue", protect, issueBook);
router.post("/return", protect, returnBook);
router.get("/my", protect, getMyIssuedBooks);

module.exports = router;
