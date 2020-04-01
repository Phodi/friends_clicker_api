require("dotenv-flow").config({ path: "./config/" })
const colors = require("colors")

//Main app
const app = require("./app")

const PORT = process.env.PORT
const HOSTNAME = process.env.HOSTNAME
const server = app.listen(PORT, HOSTNAME, () => {
  console.log(("Listening on " + HOSTNAME + ":" + PORT).cyan)
})

//handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  //Close sever and exit
  server.close(() => {
    process.exit(1)
  })
})
