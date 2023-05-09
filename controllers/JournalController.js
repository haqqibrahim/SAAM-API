require("dotenv").config();
// Import Deps
const { v4: uuidv4 } = require("uuid");

// Inbuilt Function
const { encryptData } = require("../Functions/Crypto");

// Models
const Journal = require("../Models/Journal");
const User = require("../Models/User.js");

// Create new journal entry
exports.newJournal = async (req, res) => {
  try {
    const { userId, journalText } = req.body;
    // Getting User
    const existingUser = await User.findOne({ userId });
    if (!existingUser) {
      return res.status(409).json({ messge: "User not found!" });
    }

    const encryptionSecretKey = process.env.ENCRYPTION_SECRET_KEY;
    const encryptedJournal = encryptData(journalText, encryptionSecretKey);

    // Destructing data to form journalData
    const journalData = [
      {
        id: uuidv4(),
        sourceTag: req.body.sourceTag,
        emojiRating: req.body.emojiRating,
        journalText: encryptedJournal,
        createdTime: Date.now(),
      },
    ];

    // Insert new journal entry
    await Journal.findOneAndUpdate(
      { userId: userId._id },
      { $push: { journalData: { $each: journalData } } },
      { new: true, upsert: true }
    );
   
    // Send a response back
    res.status(200).json({ message: "Journal Saved" });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// Update journal
exports.updateJournal = async (req, res) => {
  try {
    const { userId, journalText, journalId } = req.body;
    // Getting User
    const existingUser = await User.findOne({ userId });
    if (!existingUser) {
      return res.status(409).json({ messge: "User not found!" });
    }
    const encryptionSecretKey = process.env.ENCRYPTION_SECRET_KEY;
    const encryptedJournal = encryptData(journalText, encryptionSecretKey);

    // Destructing data to form journalData
    const journalData = [
      {
        id: journalId,
        sourceTag: req.body.sourceTag,
        emojiRating: req.body.emojiRating,
        journalText: encryptedJournal,
        createdTime: Date.now(),
      },
    ];

    // Updating journal in DB
    await Journal.findOneAndUpdate(
      { userId: userId._id, "journalData.id": journalId },
      { $set: { "journalData.$": journalData } },
      { new: true }
    );
    res.status(200).json({ message: "Journal updated" });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// Delete Journal
exports.deleteJournal = async (req, res) => {
  try {
    const { userId, journalId } = req.body;
    // Getting User
    const existingUser = await User.findOne({ userId });
    if (!existingUser) {
      return res.status(409).json({ messge: "User not found!" });
    }

    //Delete Journal from DB
    await Journal.findOneAndUpdate(
      { userId: userId._id },
      { $pull: { journalData: { id: journalId } } },
      { new: true }
    );
    res.status(200).json({ message: "Journal Deleted" });
  } catch (err) {
    res.status(500).json({ err });
  }
};
