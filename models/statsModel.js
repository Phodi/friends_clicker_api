const connection = require("../database_connection/mongooseConnection")

const statsSchema = new connection.Schema({
  currentScore: { type: Number, required: true, default: 0 },
  clickMul: { type: Number, required: true, default: 1 },
  autoMul: { type: Number, required: true, default: 1 }
})

module.exports = connection.model("Stats", statsSchema)
