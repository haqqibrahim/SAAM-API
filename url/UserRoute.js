const express = require("express")
const UserController = require("../controllers/UserController")

const router = express.Router()
router.post("/create_user", UserController.createUser)
router.post("/update_user", UserController.updateUser)
module.exports = router