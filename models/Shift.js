const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShiftSchema = new Schema({
    date: String,
    startTime: String,
    endTime: String, 
    totalTime: Number,
})

module.exports = mongoose.model('Shift', ShiftSchema)