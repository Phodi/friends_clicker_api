const express = require("express")

//Models
User = require("../models/userModel")
Stats = require("../models/statsModel")

//Utilities
keepKeys = require("../utils/keepKeys")
discardKeys = require("../utils/discardKeys")

module.exports = {}

/******* Admin Endpoints  *******/

//@desc get all users
//@route GET /users
//@auth admin
module.exports.getAllUsers = async (req, resp, next) => {
  try {
    const users = await User.find()
    resp.status(200).json({ data: users })
  } catch (error) {
    next(error)
  }
}

//@desc get user by id
//@route GET /users/id/:id
//@auth admin
module.exports.getUser = async (req, resp, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return resp.status(404).json({ error: "user not found" })
    }
    resp.status(200).json({ data: user })
  } catch (error) {
    next(error)
  }
}

//@desc delete user by id
//@route DELETE /users/id/:id
//@auth admin
module.exports.deleteUser = async (req, resp, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return resp.status(404).json({ error: "user not found" })
    }
    const stats = await Stats.findByIdAndDelete(user.stats)
    resp.status(200).json({ msg: `user ${req.params.id} deleted`, data: user })
  } catch (error) {
    next(error)
  }
}

//@desc logout and invalidate all bearer token
//@route GET /users/logoutall
//@auth admin
module.exports.logoutAllUser = (req, resp, next) => {
  try {
    resp.send("Welcome administrator")
  } catch (error) {
    next(error)
  }
}

/*******************************/

/******* User Endpoints  *******/

//@desc register new user
//@route POST /users
//@auth public
module.exports.registerUser = async (req, resp, next) => {
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
    next(error)
  }
}

//@desc login and generate bearer token
//@route POST /users/login
//@auth user
module.exports.loginUser = async (req, resp, next) => {
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
    next(error)
  }
}

//@desc get info about logged in user
//@route GET /users/me
//auth user
module.exports.infoUser = async (req, resp, next) => {
  try {
    const stats = { ...(await Stats.findById(req.user.stats)) }
    const userInfo = {
      name: req.user.name,
      email: req.user.email,
      admin: req.user.admin,
      stats: discardKeys(stats._doc, ["_id", "__v"])
    }
    resp.json(userInfo)
  } catch (error) {
    next(error)
  }
}

//@desc get logged in user's stats
//@route GET /users/stats
//@auth user
module.exports.statsUser = async (req, resp, next) => {
  try {
    const stats = await Stats.findById(req.user.stats)
    resp.json(discardKeys(stats._doc, ["_id", "__v"]))
  } catch (error) {
    next(error)
  }
}

//@desc logout and invalidate bearer token
//@route GET /users/logout
//@auth user
module.exports.logoutUser = (req, resp, next) => {
  try {
    resp.json({ msg: req.token })
  } catch (error) {
    next(error)
  }
}

/*******************************/
