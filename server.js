require("dotenv-flow").config({ path: "./config/" })

const express = require("express")
const bodyParser = require("body-parser")

const app = express()

//middleware section
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routers
app.use("/api", require("./routes/usersRoutes"))
app.use("/api", require("./routes/scoreboardRoutes"))

//error handler
app.use(require("./middleware/error"))

const PORT = process.env.PORT
const HOSTNAME = process.env.HOSTNAME
const server = app.listen(PORT, HOSTNAME, () => {
  console.log("Listening on " + HOSTNAME + ":" + PORT)
})

//handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`)
  //Close sever and exit
  server.close(() => {
    process.exit(1)
  })
})
