// Import Deps
const mongoose = require("mongoose");

// Model Schema

// Messages Model Schema
const messagesWASchema = new mongoose.Schema({
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
const chatsWASchema = new mongoose.Schema({
  userNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UsersWA",
  },
  messages: [messagesWASchema],
});

const ChatsWA = mongoose.model("ChatsWA", chatsWASchema);
module.exports = ChatsWA;
