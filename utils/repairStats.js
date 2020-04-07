const Stats = require("../models/statsModel")
module.exports = async (user) => {
  //attach new stats if non existed
  //@note this will be call everytime user login (generateAuth) thus regenerating missing stats_doc
  if (!user.stats || !(await Stats.findById(user.stats))) {
    console.log(`creating new stats for [${user.name}]`.yellow)
    const stats = new Stats({ user: user._id })
    await stats.save()
    user.stats = stats
    await user.save()
  }
}
