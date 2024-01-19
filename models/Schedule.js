const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScheduleSchema = new Schema({
    day: Number,
    end: String,
    start: String,
    hours: Number,
    employeeId: String,
    shopId: String,
})

module.exports = mongoose.model('Schedule', ScheduleSchema)