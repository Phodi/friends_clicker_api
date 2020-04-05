const express = require("express")

//Models
const User = require("../models/userModel")
const Stats = require("../models/statsModel")

//Utilities
const ErrorResponse = require("../utils/errorResponse")
const asyncHandle = require("../middleware/asyncHandler")

module.exports = {}

/******* Admin Endpoints  *******/

//@desc get all users
//@route GET /users
//@auth admin
module.exports.getAllUsers = asyncHandle(async (req, resp, next) => {
  //parse query
  let query = req.query
  query = JSON.stringify(query)
  query.replace(/\b(gt|gte|le|let|in)\b/g, (match) => `$${match}`)
  query = JSON.parse(query)

  await Stats.calculateAll() //update all users
  const users = await User.find(query)
  resp.status(200).json({ data: { count: users.length, users } })
})

//@desc get user by id
//@route GET /users/id/:id
//@auth admin
module.exports.getUser = asyncHandle(async (req, resp, next) => {
  const user = await User.findById(req.params.id)
  await (await Stats.findById(user.stats)).calculate() //update current user stats
  if (!user) {
    throw new ErrorResponse(`user id ${req.params.id} not found`, 404)
  }
  resp.status(200).json({ user })
})

//@desc get user by name
//@route GET /users/name/:name
//@auth admin
module.exports.getUser_name = asyncHandle(async (req, resp, next) => {
  const user = await User.findOne({ name: req.params.name })
  await (await Stats.findById(user.stats)).calculate() //update current user stats
  if (!user) {
    throw new ErrorResponse(`username ${req.params.name} not found`, 404)
  }
  resp.status(200).json({ user })
})

//@desc delete user by id
//@route DELETE /users/id/:id
//@auth admin
module.exports.deleteUser = asyncHandle(async (req, resp, next) => {
  const user = await User.findByIdAndDelete(req.params.id)
  await (await Stats.findById(user.stats)).calculate() //update current user stats
  if (!user) {
    throw new ErrorResponse(`user id ${req.params.id} not found`, 404)
  }
  const stats = await Stats.findByIdAndDelete(user.stats)
  resp.status(200).json({ msg: `user ${req.params.id} deleted`, user })
})

//@desc delete user by name
//@route DELETE /users/name/:name
//@auth admin
module.exports.deleteUser_name = asyncHandle(async (req, resp, next) => {
  const user = await User.findOneAndDelete({ name: req.params.name })
  if (!user) {
    throw new ErrorResponse(`username ${req.params.name} not found`, 404)
  }
  const stats = await Stats.findByIdAndDelete(user.stats)
  resp.status(200).json({ msg: `user ${req.params.name} deleted`, user })
})

//@desc logout and invalidate all bearer token
//@route GET /users/logoutall
//@auth admin
module.exports.logoutAllUser = asyncHandle(async (req, resp, next) => {
  const cursor = User.find().cursor()
  await cursor.eachAsync(async (user) => await user.logoutAll())
  resp.status(200).json({ msg: "logout all users successful" })
})

/*******************************/

/******* User Endpoints  *******/

//@desc register new user
//@route POST /users
//@auth public
module.exports.registerUser = asyncHandle(async (req, resp, next) => {
  //new user
  const user = new User(Object.assign({}, req.body, { admin: false }))

  //trigger ".pre" middleware
  await user.save()
  const token = await user.generateAuthToken()

  let userInfo = await User.findById(user._id)
    .select("_id name email admin stats")
    .populate({
      path: "stats",
      select: "-_id -__v -user",
    })

  resp
    .status(201)
    .json({
      msg: "user registration successful",
      data: { user: userInfo, token },
    })
    .end()
})

//@desc login and generate bearer token
//@route POST /users/me/login
//@auth user
module.exports.loginUser = asyncHandle(async (req, resp, next) => {
  const { email, password } = req.body
  const user = await User.findByCredentials(email, password)

  if (!user) {
    throw new ErrorResponse(`login failed, check your credential`, 404)
  }
  const token = await user.generateAuthToken()
  resp.status(200).json({ msg: "login successful", token })
})

//@desc get info about logged in user
//@route GET /users/me
//@auth user
module.exports.infoUser = asyncHandle(async (req, resp, next) => {
  await (await Stats.findById(req.user.stats)).calculate() //update current user stats
  let userInfo = await User.findById(req.user._id)
    .select("_id name email admin stats")
    .populate({
      path: "stats",
      select: "-_id -__v -user",
    })
  resp.json({ user: userInfo })
})

//@desc logout and invalidate bearer token
//@route GET /users/me/logout
//@auth user
module.exports.logoutUser = asyncHandle(async (req, resp, next) => {
  const result = await req.user.logout(req.token)
  resp.json({ token: req.token })
})

//@desc invalidate old token and generate a new one to extend login time
//@route GET /users/me/renew
//@auth user
module.exports.renewUser = asyncHandle(async (req, resp, next) => {
  await req.user.logout(req.token)
  const newToken = await req.user.generateAuthToken()

  resp.json({ token: newToken })
})

//@desc logout and invalidate all user's bearer tokens
//@route GET /users/logoutall
//@auth user
module.exports.logoutUserAll = asyncHandle(async (req, resp, next) => {
  const result = await req.user.logoutAll()
  resp.json({ msg: "logout all successful" })
})

/*******************************/
