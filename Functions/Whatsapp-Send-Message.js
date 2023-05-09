var request = require("request");

// Function to send message to WhatsApp
const sendMessage = async (message, senderID) => {
  try {
    var options = {
      method: "POST",
      url: "https://api.ultramsg.com/instance46339/messages/chat",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      form: {
        token: process.env.ULTRA_MSG_TOKEN,
        to: senderID,
        body: message,
        priority: "10",
        referenceId: "",
      },
    };
    await request(options, (error, response, body) => {
      if (error) {
        console.log(`Error at sendMessage Request --> ${error}`);
      }
      console.log(body);
    });
  } catch (error) {
    console.log(`Error at sendMessage --> ${error}`);
  }
};

module.exports = {
  sendMessage,
};
