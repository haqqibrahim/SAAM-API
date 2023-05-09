// Import Model
const ChatsWa = require("../Models/ChatsWA");

// Import Deps
const { v4: uuidv4 } = require("uuid");

//Function to Save the new chat entry
exports.SaveChatsWA = async (id, sender, message) => {
  const messages = {
    id: uuidv4(),
    sender,
    text: message,
  };

  await ChatsWa.findOneAndUpdate(
    { userNumber: id },
    { $push: { messages } },
    { new: true, upsert: true }
  );
  console.log(`${sender} Chat Saved`);
};
