const express = require("express")
const bodyParser = require("body-parser")
const colors = require("colors")
const cors = require("cors")

const app = express()

//CORS
app.use(cors())

//middleware section
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routers
app.use("/api", require("./routes/usersRoutes"))
app.use("/api", require("./routes/scoreboardRoutes"))
app.use("/api", require("./routes/statsRoutes"))

//error handler
app.use(require("./middleware/error"))

module.exports = app
