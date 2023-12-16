const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShiftSchema = new Schema({
    day: Number,
    end: String,
    start: String,
    hours: Number,
    employeeId: String,
    amount: Number
})

module.exports = mongoose.model('Shift', ShiftSchema)