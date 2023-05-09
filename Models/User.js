// Importing Deps
const mongoose = require("mongoose")

// Creating Schema
const userSchema  = new mongoose.Schema({
    userId: {
        type: String, required: true, unique: true
    },
    fullName: {
        type: String, required: true
    },
    nickName: {
        type: String, required: true, unique: true
    },
    phoneNumber: {
        type: Number, required: true, unique: true
    },
    email: {
        type: String, required: true
    },
    DOB: {
        type: String, required: true
    }
})

const User = mongoose.model('Users', userSchema)
module.exports = User