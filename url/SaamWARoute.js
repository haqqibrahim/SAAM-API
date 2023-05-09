// Import Modules
const express = require("express")

const router = express.Router()

// Import Controllers
const UsersWAController = require("../controllers/SaamWAController")

router.post("/", UsersWAController.receiveMessageWA)

module.exports = router

