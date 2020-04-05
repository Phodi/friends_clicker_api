const express = require("express")
const path = require("path")
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

//react_build (Website)
app.use(express.static(path.join(__dirname, "/react_build")))

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/react_build/index.html"))
})

//error handler
app.use(require("./middleware/error"))

module.exports = app
