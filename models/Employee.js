const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    googleId: String,
    givenName: String,
    familyName: String,
    email: String,
    role: String,
    picture: String,
    shops: [String],
    shopType: String
})

module.exports = mongoose.model('Employees', EmployeeSchema)