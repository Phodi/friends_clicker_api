const connection = require("../database_connection/mongooseConnection")

const statsSchema = new connection.Schema({
  currentScore: { type: Number, required: true, default: 0 },
  clickRate: { type: Number, required: true, default: 0 },
  autoRate: { type: Number, required: true, default: 0 },
  updated: { type: Date, required: true, default: Date.now },
  user: { type: connection.Schema.Types.ObjectId, ref: "User" }
})

statsSchema.methods.calculate = async function() {
  const stats = this

  const secondsPassed = (Date.now() - stats.updated) / 1000

  //Additional score
  let additionScore = stats.autoRate * secondsPassed

  //Apply score
  stats.currentScore += additionScore

  stats.updated = Date.now()
  await stats.save()
  return stats
}

statsSchema.statics.calculateAll = async () => {
  const cursor = Stats.find().cursor()
  cursor.eachAsync(async stats => await stats.calculate())
}

const Stats = connection.model("Stats", statsSchema)

module.exports = Stats
