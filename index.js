require("dotenv-flow").config({ path: "./config/" })

const express = require("express")
const bodyParser = require("body-parser")

const app = express()

//middleware section
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routers
app.use(require("./routes/usersRoutes"))
app.use(require("./routes/scoreboardRoutes"))

const PORT = process.env.PORT
const HOSTNAME = process.env.HOSTNAME
app.listen(PORT, HOSTNAME, () => {
  console.log("Listening on " + HOSTNAME + ":" + PORT)
})
