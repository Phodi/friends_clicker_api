module.exports = (error, req, resp, next) => {
  console.log(error.stack)

  resp.status(500).json({ error: error.message })
}
