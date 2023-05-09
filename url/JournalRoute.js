// imprt Deps
const express = require("express")
const router = express.Router()

// Controller
const JournalController = require("../controllers/JournalController")

// Routes
router.put("/new_journal", JournalController.newJournal)
router.put("/update_journal", JournalController.updateJournal)
// router.delete("/delete_journal", JournalController.deleteJournal)
module.exports = router