const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    googleId: String,
    givenName: String,
    familyName: String,
    email: String,
    shopName: String,
    password: String
})

module.exports = mongoose.model('user', UserSchema)