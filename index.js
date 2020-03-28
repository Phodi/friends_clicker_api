require("dotenv-flow").config();

const express = require("express")
const bodyParser = require("body-parser")

const app = express()

//middleware section
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true}))

//routers
app.use(require("./routes/apiRoutes"))

const PORT = process.env.PORT
const HOSTNAME = process.env.HOSTNAME
app.listen(PORT, HOSTNAME , () => {
    console.log('Listening on '+HOSTNAME+':'+PORT)
})
