// Import Deps
const mongoose = require("mongoose");

// Model Schema

// Messages Model Schema
const memoryMsgWASchema = new mongoose.Schema({
  role: {
    type: String,
  },
  content: {
    type: String,
  },
});

// Chats Model Schema
const memoryWASchema = new mongoose.Schema({
  userNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UsersWA",
  },
  messages: [memoryMsgWASchema],
});

const MemoryWA = mongoose.model("MemoryWA", memoryWASchema);
module.exports = MemoryWA;
