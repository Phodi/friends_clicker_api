//Utilities
const ErrorResponse = require("../utils/errorResponse")
const asyncHandle = require("../middleware/asyncHandler")

//Models
User = require("../models/userModel")
Stats = require("../models/statsModel")

module.exports = {}

//@desc get logged in user's stats
//@route GET /stats
//@auth user
module.exports.getStats = asyncHandle(async (req, resp, next) => {
  const stats = await Stats.findById(req.user.stats).select("-_id -__v -user")
  resp.json({ data: stats })
})

//@desc update logged in user's stats
//@route PUT /stats
//@auth user
//@note use data inside requestBody.data to update stats
module.exports.putStats = asyncHandle(async (req, resp, next) => {
  // console.log("req.body.data :", req.body.data)
  const stats = await Stats.findByIdAndUpdate(req.user.stats, req.body.data, {
    new: true,
    runValidators: true
  })
  resp.json({ data: stats })
})
