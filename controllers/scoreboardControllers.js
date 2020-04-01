//Utilities
const ErrorResponse = require("../utils/errorResponse")
const asyncHandle = require("../middleware/asyncHandler")

//Models
User = require("../models/userModel")
Stats = require("../models/statsModel")

module.exports = {}

//@desc get highest scores
//@route GET /scoreboard
//@auth public
module.exports.getScoreboard = asyncHandle(async (req, resp, next) => {
  let scores = await Stats.find()
    .select("-_id -__v")
    .populate({
      path: "user",
      select: "name admin -_id"
    })
    .sort("-currentScore")

  resp.status(200).json({ data: scores })
})
