module.exports = (raw, disallowed) => {
  const temp = { ...raw }
  const result = {}
  Object.keys(temp).forEach(key => {
    if (!disallowed.includes(key)) {
      result[key] = temp[key]
    }
  })
  return result
}
