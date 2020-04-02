//Utilities
const ErrorResponse = require("../utils/errorResponse")
const asyncHandle = require("../middleware/asyncHandler")

//Models
User = require("../models/userModel")
Stats = require("../models/statsModel")

module.exports = {}
// const test = async () => {
//   console.log("I'm here")
//   try {
//     await new Stats().save()
//   } catch (err) {
//     console.log(err.message.red)
//   }
// }
// test()

//@desc get logged in user's stats
//@route GET /stats
//@auth user
module.exports.getStats = asyncHandle(async (req, resp, next) => {
  await (await Stats.findById(req.user.stats)).calculate() //update current user stats
  const stats = await Stats.findById(req.user.stats).select("-__v -user")
  resp.json({ data: stats })
})

//@desc update logged in user's stats
//@route PUT /stats
//@auth user
//@note use data inside requestBody.data to update stats
module.exports.putStats = asyncHandle(async (req, resp, next) => {
  await (await Stats.findById(req.user.stats)).calculate() //update current user stats
  const stats = await Stats.findByIdAndUpdate(
    req.user.stats,
    Object.assign(req.body.data, { updated: Date.now() }),
    {
      new: true,
      runValidators: true
    }
  ).select("-__v -user")
  resp.json({ data: stats })
})
