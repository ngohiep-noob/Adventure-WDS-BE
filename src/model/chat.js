const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("chat", ChatSchema);
