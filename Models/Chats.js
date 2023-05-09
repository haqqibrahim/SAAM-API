// Import Deps
const mongoose = require("mongoose");

// Model Schema

// Messages Model Schema
const messagesSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  sender: {
    type: String,
  },
  text: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// Chats Model Schema
const chatsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messages: [messagesSchema],
});

const Chats = mongoose.model("Chats", chatsSchema)
exports.module = Chats
