// Import Model
const MemoryWa = require("../Models/MemoryWA");

// Function to Save to Memory
exports.saveMemory = async (id, role, content) => {
  const memoryMsg = {
    role,
    content,
  };

  await MemoryWa.findOneAndUpdate(
    { userNumber: id },
    { $push: { messages: memoryMsg } },
    { new: true, upsert: true }
  );
  console.log(`${role} Message Saved to Memory`);
  // console.log(memory)
};
