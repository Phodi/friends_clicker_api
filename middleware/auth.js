const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//middleware for user authentication
const auth = async (req,res,next) => {
    try{
        // 'Bearer <token bla bla bla> => '<token bla bla bla>'
        const token = req.header('Authorization').replace('Bearer ', '')
        const payload = jwt.verify(token, process.env.TOKEN_KEY)
        
        //user exist in the systyem?
        const user = await User.findOne({   _id: payload._id,
                                            'tokens.token': token})
        if(!user) {throw new Error()}

        //attach user object to the request
        req.user = user
        req.token = token

        console.log("#AUTH "+(user.admin?"Admin":"User")+"[ " + user.name + " : " + user.email+" ] authenticated")

        next()
    }catch(error){
        console.log("#AUTH authentication failed")
        res.status(401).json({error: 'Not authorize to access this resource.'})
    }

}

module.exports = auth