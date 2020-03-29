const express = require("express")
const router = express.Router()

//Models
User = require("../models/userModel")
Stats = require("../models/statsModel")

//import authentication middleware
const auth = require("../middleware/auth")

//Utilities
keepKeys = require("../utils/keepKeys")
discardKeys = require("../utils/discardKeys")

/******* User Endpoints  *******/

router.get("/api/users", auth, async (req, resp) => {
  if (req.user.admin) {
    try {
      const users = await User.find()
      resp.status(200).json(users)
    } catch (e) {
      resp.status(404).json({ error: e.message })
    }
  } else {
    resp.json({ error: "Insufficient permission" })
  }
})

router.post("/api/users", async (req, resp) => {
  try {
    //new stats
    const stats = new Stats({})
    await stats.save()

    //new user with stats
    const user = new User(
      Object.assign({}, req.body, { admin: false }, { stats: stats })
    )

    //trigger ".pre" middleware
    await user.save()
    const token = await user.generateAuthToken()

    resp.status(201).json({ msg: "User registration successful", user, token })
  } catch (error) {
    resp.status(400).json({ error: error.message })
  }
})

router.post("/api/users/login", async (req, resp) => {
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)

    if (!user) {
      return resp
        .status(401)
        .json({ error: "Log in failed, please check your credentials" })
    }
    const token = await user.generateAuthToken()
    resp.status(200).json({ token })
  } catch (error) {
    resp.status(400).json({ error: error.message })
  }
})

router.get("/api/users/me", auth, async (req, resp) => {
  const stats = { ...(await Stats.findById(req.user.stats)) }
  const userInfo = {
    name: req.user.name,
    email: req.user.email,
    admin: req.user.admin,
    stats: discardKeys(stats._doc, ["_id", "__v"])
  }
  resp.json(userInfo)
})

router.get("/api/users/stats", auth, async (req, resp) => {
  try {
    const stats = await Stats.findById(req.user.stats)
    resp.json(discardKeys(stats._doc, ["_id", "__v"]))
  } catch (e) {
    resp.json({ error: e.message })
  }
})

router.post("/api/users/logout", auth, (req, resp) => {})

router.get("/api/users/logoutall", auth, (req, resp) => {
  if (req.user.admin) {
    resp.send("Welcome administrator")
  } else {
    resp.json({ error: "Insufficient permission" })
  }
})

module.exports = router
