//Utilities
const keepKeys = require("../utils/keepKeys")
const discardKeys = require("../utils/discardKeys")
const ErrorResponse = require("../utils/errorResponse")
const asyncHandle = require("../middleware/asyncHandler")

//Models
User = require("../models/userModel")
Stats = require("../models/statsModel")

module.exports = {}

module.exports.getScoreboard = asyncHandle(async (req, resp, next) => {
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
    resp.status(200).json(result)
  })
})
