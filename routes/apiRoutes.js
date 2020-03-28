require("dotenv-flow").config();
const express = require("express");
const router = express.Router();

//MongoDB Atlas connection string

const connStr = process.env.DATABASE_URL
                .replace("<user>",process.env.DATABASE_USER)
                .replace("<password>",process.env.DATABASE_PWD)
                .replace("<database>",process.env.DATABASE_NAME)
console.log("Connecting to: "+connStr)

const mongoose = require('mongoose')
mongoose.connect(connStr, { useNewUrlParser: true,
                            useUnifiedTopology: true,
                            useFindAndModify: false,
                            useCreateIndex: true
})
const db = mongoose.connection
db.on('error', () => console.log('Database connection error'))
db.once('open', () => console.log('Database connected'))

//Models
User = require("../models/userModel")
Stats = require("../models/statsModel")

//import authentication middleware
const auth = require('../middleware/auth')

router.get('/new', async (req,resp) => {
    resp.send("This is a quick test endpoint")
})

/******* Scoreboard Endpoints  *******/
router.get('/api/users/scoreboard', async (req,resp) => {
    // resp.send("Here be the list of scores")
    resp.status(200).send("Here be the list of scores ")
})

/******* User Endpoints  *******/

router.get('/api/users'), async (req,resp) => {
    try{
        const users = await User.find()
        resp.status(200).json(users)
    } catch (e) {
        resp.status(404).json({error: e.message})
    }
}

router.post('/api/users', async (req,resp) => {
    try{
        //new stats
        const stats = new Stats({})
        await stats.save()

        //new user with stats
        const user = new User(Object.assign({},
            req.body,
            {stats: stats}))

        //trigger ".pre" middleware
        await user.save()
        const token = await user.generateAuthToken()


        resp.status(201).json({msg: 'add user successfull', user, token})
    }catch(error){
        resp.status(400).json({error: error.message})

    }
})

router.post('/api/users/login', async (req,resp) => {
    try{
        const {email, password} = req.body
        const user = await User.findByCredentials(email,password)

        if(!user){
            return resp.status(401).json({error: 'Log in failed, please check your credentials'})
        }
        const token = await user.generateAuthToken()
        resp.status(200).json({token})
    }catch(error){
        resp.status(400).json({error: error.message})
    }
})

router.get('/api/users/me', auth, async (req,resp) => {
    const stats = {...await Stats.findById(req.user.stats)}
    const userInfo = {
        name: req.user.name,
        email: req.user.email,
        admin: req.user.admin,
        stats: stats._doc
    }
    resp.json(userInfo)
})

router.get('/api/users/stats', auth, async (req,resp) => {
    try {
        const stats = await Stats.findById(req.user.stats)
        resp.json(stats)
    } catch (e) {
        resp.json({error: e.message})
    }
})

router.post('/api/users/logout', auth, (req,resp) => {
    
})

router.get('/api/users/logoutall', auth, (req,resp) => {
    if (req.user.admin) {
        resp.send("Welcome administrator")
    } else {
        resp.json({error: "Insufficient permission"})
    }
})

module.exports = router;
