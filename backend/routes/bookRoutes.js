const express = require("express");
const router = express.Router();

const {
  addBook,
  getBooks
} = require("../controllers/bookController");

router.post("/", addBook);   // Add book
router.get("/", getBooks);   // Get all books

module.exports = router;
