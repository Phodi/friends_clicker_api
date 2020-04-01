module.exports = fn => (req, resp, next) =>
  Promise.resolve(fn(req, resp, next)).catch(next)
