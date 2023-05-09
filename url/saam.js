const express = require("express")
const saamController = require("../controllers/SaamController")

const router = express.Router()

router.post("/", saamController.saam)
module.exports = router