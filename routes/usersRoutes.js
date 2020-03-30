const express = require("express")
const router = express.Router()

//Models
User = require("../models/userModel")
Stats = require("../models/statsModel")

//import authentication middleware
const auth = require("../middleware/auth")
const admin = require("../middleware/auth_admin")

//Utilities
keepKeys = require("../utils/keepKeys")
discardKeys = require("../utils/discardKeys")

/******* Admin Endpoints  *******/

//@desc get all users
//@auth admin
router.get("/users", auth, admin, async (req, resp) => {
  try {
    const users = await User.find()
    resp.status(200).json({ data: users })
  } catch (e) {
    resp.status(404).json({ error: e.message })
  }
})

//@desc get user by id
//@auth admin
router.get("/users/id/:id", auth, admin, async (req, resp) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return resp.status(404).json({ error: "user not found" })
    }
    resp.status(200).json({ data: user })
  } catch (e) {
    resp.status(404).json({ error: e.message })
  }
})

//@desc delete user by id
//@auth admin
router.delete("/users/id/:id", auth, admin, async (req, resp) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return resp.status(404).json({ error: "user not found" })
    }
    const stats = await Stats.findByIdAndDelete(user.stats)
    resp.status(200).json({ msg: `user ${req.params.id} deleted`, data: user })
  } catch (e) {
    resp.status(404).json({ error: e.message })
  }
})

//@desc logout and invalidate all bearer token
//@auth admin
router.get("/users/logoutall", auth, admin, (req, resp) => {
  resp.send("Welcome administrator")
})

/*******************************/

/******* User Endpoints  *******/

//@desc register new user
//@auth public
router.post("/users", async (req, resp) => {
  try {
    console.log("Registering new user")
    //new user
    const user = new User(Object.assign({}, req.body, { admin: false }))

    //trigger ".pre" middleware
    await user.save()
    const token = await user.generateAuthToken()

    resp
      .status(201)
      .json({ msg: "user registration successful", data: { user } })
      .end()
  } catch (error) {
    resp.status(400).json({ error: error.message })
  }
})

//@desc login and generate bearer token
//@auth user
router.post("/users/login", async (req, resp) => {
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)

    if (!user) {
      return resp
        .status(401)
        .json({ error: "log in failed, please check your credentials" })
    }
    const token = await user.generateAuthToken()
    resp.status(200).json({ msg: "login successful", data: { token } })
  } catch (error) {
    resp.status(400).json({ error: error.message })
  }
})

//@desc get info about logged in user
//auth user
router.get("/users/me", auth, async (req, resp) => {
  const stats = { ...(await Stats.findById(req.user.stats)) }
  const userInfo = {
    name: req.user.name,
    email: req.user.email,
    admin: req.user.admin,
    stats: discardKeys(stats._doc, ["_id", "__v"])
  }
  resp.json(userInfo)
})

//@desc get logged in user's stats
//auth user
router.get("/users/stats", auth, async (req, resp) => {
  try {
    const stats = await Stats.findById(req.user.stats)
    resp.json(discardKeys(stats._doc, ["_id", "__v"]))
  } catch (e) {
    resp.json({ error: e.message })
  }
})

//@desc logout and invalidate bearer token
//@auth user
router.get("/users/logout", auth, (req, resp) => {
  resp.json({ msg: "okay" })
})

/*******************************/

module.exports = router
