const mongoose = require('mongoose')

const statsSchema = new mongoose.Schema({
    currentScore: {type: Number, required:true, default: 0},
    clickMul: {type: Number, required:true, default: 1},
    autoMul: {type: Number, required:true, default: 1}
})

module.exports = mongoose.model("Stats",statsSchema)