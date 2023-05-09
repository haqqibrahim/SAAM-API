// Import Deps
const mongoose = require("mongoose");

// Creating the WhatsApp Users Schema
const UsersWASchema = mongoose.Schema({
  userNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

const UsersWA = mongoose.model("UsersWA", UsersWASchema)
module.exports = UsersWA
