const Issue = require("../models/Issue");
const Book = require("../models/Book");

// 📘 ISSUE BOOK
exports.issueBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book || book.quantity <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // 🔥 FIX: dueDate set (7 days)
    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const issue = new Issue({
      userId,
      bookId,
      issueDate,
      dueDate, // ✅ THIS WAS MISSING
      status: "issued",
      fine: 0,
    });

    await issue.save();

    book.quantity -= 1;
    await book.save();

    res.json({ message: "Book issued successfully" });
  } catch (err) {
    console.error("Issue Book Error:", err);
    res.status(500).json({ message: "Issue failed" });
  }
};

// 🔁 RETURN BOOK
exports.returnBook = async (req, res) => {
  try {
    const { issueId } = req.body;

    const issue = await Issue.findById(issueId);
    if (!issue || issue.status === "returned") {
      return res.status(400).json({ message: "Invalid issue record" });
    }

    const returnDate = new Date();

    // 🧮 Fine calculation
    let fine = 0;
    if (returnDate > issue.dueDate) {
      const daysLate = Math.ceil(
        (returnDate - issue.dueDate) / (1000 * 60 * 60 * 24)
      );
      fine = daysLate * 5; // ₹5 per day
    }

    issue.status = "returned";
    issue.returnDate = returnDate;
    issue.fine = fine;

    await issue.save();

    const book = await Book.findById(issue.bookId);
    book.quantity += 1;
    await book.save();

    res.json({ message: "Book returned successfully", fine });
  } catch (err) {
    console.error("Return Book Error:", err);
    res.status(500).json({ message: "Return failed" });
  }
};

// 👤 MY ISSUED BOOKS
exports.getMyIssuedBooks = async (req, res) => {
  try {
    const issues = await Issue.find({
      userId: req.user.id,
      status: "issued",
    }).populate("bookId");

    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch issued books" });
  }
};
