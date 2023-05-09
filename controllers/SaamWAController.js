// Import Models
const UsersWA = require("../Models/UsersWA.js");

// Import Functions
const { SaveChatsWA } = require("../Functions/SaveChatsWADB.js");
const { saveMemory } = require("../Functions/SaveMemoryWADB.js");
const { Saam } = require("../Functions/Saam.js");
const { sendMessage } = require("../Functions/Whatsapp-Send-Message.js");
// Receive Messages from WhatsApp
exports.receiveMessageWA = async (req, res) => {
  // Destructing the message and sender's number

  let userNumber = req.body["data"]["from"]; // sender number
  let message = req.body["data"]["body"]; // Message text
  // cHECK IF MSG IS A TEXT:
  let msgType = req.body["data"]["type"];
  if (msgType != "chat") {
    sendMessage("Oops, Saam only understands text", userNumber);
    res.status(200).send({
      mesage: "Sent",
    });
  }

  // Checking if user exists
  const exisitingNumber = await UsersWA.findOne({ userNumber });
  if (!exisitingNumber) {
    console.log(`Creating new user: ${userNumber}`);
    const userWA = new UsersWA({ userNumber });
    await userWA.save();
    console.log(`New user created: ${userWA}`);
    // Save User's message to chatDB
    await SaveChatsWA(userWA._id, "User", message);
    // Save User's Message to MemoryDB
    await saveMemory(userWA._id, "user", message);
    // Call Saam - AI
    await Saam(userWA._id, userNumber);
    res.status(200).send({
      mesage: "Sent",
    });
  }
  if (exisitingNumber) {
    console.log(`This user exists!!`);
    // Save User's message to chatDB
    await SaveChatsWA(exisitingNumber._id, "User", message);
    // Save User's Message to MemoryDB
    await saveMemory(exisitingNumber._id, "user", message);
    // Call Saam - AI
    await Saam(exisitingNumber._id, userNumber);
    res.status(200).send({
      mesage: "Sent",
    });
  }
};
