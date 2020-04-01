const ErrorResponse = require("../utils/errorResponse")

module.exports = (err, req, resp, next) => {
  let error = { ...err }
  error.message = err.message

  console.log(err.stack.red)
  console.log(err)

  if (err.name == "CastError") {
    const message = `user id ${error.value} is invalid`
    error = new ErrorResponse(message, 401)
  }

  resp
    .status(error.statusCode || 500)
    .json({ error: error.message || "server error" })
}
