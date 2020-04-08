module.exports = async (data, token, statusCode, resp) => {
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  }
  resp
    .status(statusCode)
    .cookie("token", token, options)
    .json(Object.assign(data, { token }))
}
