const express = require('express');
const router = express.Router();
const { createShop, getAllShops } = require('../controllers/ShopController');

router.post('/add-shop', createShop)
router.post('/shops', getAllShops)

module.exports = router