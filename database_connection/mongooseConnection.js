//MongoDB Atlas connection string

const connStr = process.env.DATABASE_URL.replace(
  "<user>",
  process.env.DATABASE_USER
)
  .replace("<password>", process.env.DATABASE_PWD)
  .replace("<database>", process.env.DATABASE_NAME)
console.log(("Connecting to: " + connStr).cyan)

const mongoose = require("mongoose")
mongoose.connect(connStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
const db = mongoose.connection
db.on("error", () => console.log("Database connection error".red))
db.once("open", () =>
  console.log(("Database connected: " + mongoose.connection.host).cyan)
)

module.exports = mongoose
