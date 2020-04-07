const connection = require("../database_connection/mongooseConnection")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")

//Models
Stats = require("../models/statsModel")

const userSchema = new connection.Schema({
  name: {
    type: String,
    required: [true, "name required"],
    maxlength: [30, "name cannot be longer than 30 characters"],
    unique: [true, "this name is already taken"],
    validate: [
      {
        validator: (value) => !value.includes(" "),
        msg: "name cannot have spaces",
      },
    ],
  },
  email: {
    type: String,
    required: [true, "email address required"],
    unique: [true, "this email address is already used"],
    lowercase: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "email address invalid",
    },
  },
  password: {
    type: String,
    required: [true, "password required"],
    minlength: 6,
  }, //hashed password
  admin: { type: Boolean, required: true, default: false },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
  stats: { type: connection.Schema.Types.ObjectId, ref: "Stats" },
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
})

// schema-level middleware
userSchema.pre("save", async function (next) {
  const user = this
  if (user.isModified("password")) {
    //salt+hash encrption (มีสอบด้วย!!!)
    user.password = await bcrypt.hash(user.password, 10)
  }
  //continue
  next()
})

// BUG: always create new stat even if user info validation failed
// userSchema.post("validate", async function () {
//   const user = this
//   //attach new stats if non existed
//   //@note this will be call everytime user login (generateAuth) thus regenerating missing stats_doc
//   if (!user.stats || !(await Stats.findById(user.stats))) {
//     console.log(`creating new stats for [${user.name}]`.yellow)
//     const stats = new Stats({ user: user._id })
//     stats.save()
//     user.stats = stats
//   }
// })

userSchema.pre("remove", { query: true, document: true }, async function (
  next
) {
  const user = this
  await Stats.findByIdAndDelete(user.stats)
  next()
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const payload = {
    _id: user._id,
    email: user.email,
    admin: user.admin,
  }

  const token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: "2m",
    issuer: "ClickerAuthority",
  })
  user.tokens = user.tokens.concat({ token: token })
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error()
    }
    //compare provided 'password' with hash 'user.password'
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      throw new Error()
    }
    return user
  } catch (error) {
    return null
  }
}

userSchema.methods.logout = async function (token) {
  try {
    const user = this
    const remainingTokens = user.tokens.filter((obj) => obj.token != token)
    user.tokens = remainingTokens
    await user.save()
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

userSchema.methods.logoutAll = async function () {
  try {
    const user = this
    user.tokens = []
    await user.save()
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const User = connection.model("User", userSchema)
module.exports = User
