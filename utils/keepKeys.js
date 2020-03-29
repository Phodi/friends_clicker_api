module.exports = (raw, allowed) => {
  const temp = { ...raw }
  const result = {}
  Object.keys(temp).forEach(key => {
    if (allowed.includes(key)) {
      result[key] = temp[key]
    }
  })
  return result
}
