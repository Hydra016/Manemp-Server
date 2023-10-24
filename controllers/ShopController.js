const Shop = require('../models/Shop');

const createShop = async (req, res) => {
    const { name, user_id } = req.body

    const newShop = await new Shop({
        name,
        user_id,
    }).save()

    res.status(200).json({ data: newShop })
}

const getAllShops = async (req, res) => {
    const { user_id } = req.body

    try {
        const allShops = await Shop.find({ user_id });
        res.status(200).json({ data: allShops });
    } catch(err) {
        console.log(err.message)
    }
}

module.exports = {
    createShop,
    getAllShops
}