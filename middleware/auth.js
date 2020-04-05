const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

//Utilities
const ErrorResponse = require("../utils/errorResponse")
const asyncHandle = require("../middleware/asyncHandler")

//middleware for user authentication
const auth = asyncHandle(async (req, res, next) => {
  try {
    // 'Bearer <token bla bla bla> => '<token bla bla bla>'
    const token = req.header("Authorization").replace("Bearer ", "")
    const payload = jwt.verify(token, process.env.TOKEN_KEY)

    //user exist in the systyem?
    const user = await User.findOne({ _id: payload._id, "tokens.token": token })
    if (!user) {
      throw new ErrorResponse("user does not exist", 404)
    }

    //attach user object to the request
    req.user = user
    req.token = token

    console.log(
      `#AUTH ${user.admin ? "Admin" : "User"}[ ${user.name} : ${
        user.email
      }] authenticated`
    )

    next()
  } catch (error) {
    console.log("#AUTH authentication failed")
    if (error.name == "TokenExpiredError") {
      console.log("#AUTH authentication failed token expired")
      throw new ErrorResponse("token expired", 401)
    }
    console.log("#AUTH error: ", error)
    throw new ErrorResponse("unauthenticated request", 401)
  }
})

module.exports = auth
