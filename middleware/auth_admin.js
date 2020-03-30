//use after auth to check user permission
module.exports = (req, resp, next) => {
  if (!req.user) {
    return resp
      .status(401)
      .json({ error: "Not authorize to access this resource." })
  } else {
    if (req.user.admin) {
      next()
    } else {
      return resp.status(401).json({ error: "insufficient permission" })
    }
  }
}
