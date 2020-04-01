const express = require("express")
const router = express.Router()

//Models
User = require("../models/userModel")
Stats = require("../models/statsModel")

//import authentication middleware
const auth = require("../middleware/auth")
const admin = require("../middleware/auth_admin")

//Controllers
const {
  getAllUsers,
  getUser,
  registerUser,
  deleteUser,
  loginUser,
  logoutUser,
  logoutUserAll,
  logoutAllUser,
  infoUser,
  statsUser
} = require("../controllers/userControllers")

/******* Admin Endpoints  *******/

//@desc get all users
//@auth admin
router.get("/users", auth, admin, getAllUsers)

//@desc get user by id
//@auth admin
router.get("/users/id/:id", auth, admin, getUser)

//@desc delete user by id
//@auth admin
router.delete("/users/id/:id", auth, admin, deleteUser)

//@desc logout and invalidate all bearer token
//@auth admin
router.get("/users/logoutall", auth, admin, logoutAllUser)

/*******************************/

/******* User Endpoints  *******/

//@desc register new user
//@auth public
router.post("/users", registerUser)

//@desc get info about logged in user
//auth user
router.get("/users/me", auth, infoUser)

//@desc get logged in user's stats
//auth user
router.get("/users/me/stats", auth, statsUser)

//@desc login and generate bearer token
//@auth user
router.post("/users/me/login", loginUser)

//@desc logout and invalidate bearer token
//@auth user
router.get("/users/me/logout", auth, logoutUser)

//@desc logout and invalidate all user's bearer tokens
//@auth user
router.get("/users/me/logoutall", auth, logoutUserAll)

/*******************************/

module.exports = router
