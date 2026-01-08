const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
    default: function () {
      const d = new Date(this.issuedAt || Date.now());
      d.setDate(d.getDate() + 7);
      return d;
    },
  },
  returnedAt: Date,
  returned: {
    type: Boolean,
    default: false,
  },
  fine: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Issue", issueSchema);
