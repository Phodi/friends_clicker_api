const express = require("express")
const router = express.Router()

//Controllers
const { getScoreboard } = require("../controllers/scoreboardControllers")

/******* Scoreboard Endpoints  *******/
router.get("/scoreboard", getScoreboard)

module.exports = router
