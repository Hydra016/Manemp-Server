const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShopSchema = new Schema({
    name: String,
    user_id: String,
})

module.exports = mongoose.model('shop', ShopSchema)