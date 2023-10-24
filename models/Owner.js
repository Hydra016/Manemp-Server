const mongoose = require('mongoose');
const { Schema } = mongoose;
const ShopSchema = require('./Shop'); 

const OwnerSchema = new Schema({
    googleId: String,
    givenName: String,
    familyName: String,
    email: String,
    role: String
})

module.exports = mongoose.model('owner', OwnerSchema)