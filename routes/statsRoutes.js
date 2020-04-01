const express = require("express")
const router = express.Router()

//import authentication middleware
const auth = require("../middleware/auth")
const admin = require("../middleware/auth_admin")

//Controllers
const { getStats, putStats } = require("../controllers/statsControllers")

/******* Scoreboard Endpoints  *******/

//@desc get logged in user's stats
//@route GET /stats
//@auth user
router.get("/stats", auth, getStats)

//@desc update logged in user's stats
//@route PUT /stats
//@auth user
router.put("/stats", auth, putStats)

module.exports = router
