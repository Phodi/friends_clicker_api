const express = require("express")
const router = express.Router()

//Utilities
keepKeys = require("../utils/keepKeys")
discardKeys = require("../utils/discardKeys")

//Models
User = require("../models/userModel")
Stats = require("../models/statsModel")

/******* Scoreboard Endpoints  *******/
router.get("/api/scoreboard", async (req, resp) => {
  let users = await User.find()
  const filter = async () => {
    return Promise.all(
      users.map(async user => {
        const filtered = keepKeys(user._doc, ["admin", "name", "stats"])
        const stats = await Stats.findById(filtered.stats)
        filtered.stats = discardKeys(stats._doc, ["_id", "__v"])
        return filtered
      })
    )
  }

  filter().then(result => {
    console.log(result)
    resp.status(200).json(result)
  })

  // resp.status(200).json(users);
})

module.exports = router
