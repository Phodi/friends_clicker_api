const ErrorResponse = require("../utils/errorResponse")

module.exports = (err, req, resp, next) => {
  let error = { ...err }
  error.message = err.message

  console.log(err)

  //Mongoose CastError
  if (err.name == "CastError") {
    const message = `user id ${error.value} is invalid`
    error = new ErrorResponse(message, 401)
  }

  //Mongoose ValidationError
  if (err.name == "ValidationError") {
    const message = Object.values(err.errors).map(e => e.message)
    error = new ErrorResponse(message, 401)
  }

  //Mongoose Duplicate Key
  if (err.code == 11000) {
    const message = `duplicate field`
    error = new ErrorResponse(message, 401)
  }

  resp
    .status(error.statusCode || 500)
    .json({ error: error.message || "server error" })
}
