const Book = require("../models/Book");

// ➕ ADD BOOK
exports.addBook = async (req, res) => {
  try {
    const { title, author, category, quantity } = req.body;

    const book = new Book({
      title,
      author,
      category,
      quantity
    });

    await book.save();

    res.status(201).json({
      message: "Book Added Successfully",
      book
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// 📚 GET ALL BOOKS
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
