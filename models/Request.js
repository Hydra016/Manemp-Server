const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequestSchema = new Schema({
    businessId: String,
    employeeId: String,
    yes: {
        type: String,
        default: 0
    },
    pending: {
        type: String,
        default: 0
    },
    no: {
        type: String,
        default: 0
    }
})

module.exports = mongoose.model('request', RequestSchema)