// Import Deps
const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  journalData: [
    {
      id: { type: String },
      createdTime: {
        type: Date,
       
      },
      sourceTag: {
        type: String,
      },
      emojiRating: {
        type: String,
      },
      journalText: {
        type: String
      }
    },
  ],
});

// Create Schema
const Journal  = mongoose.model("Journal", journalSchema)
module.exports = Journal
