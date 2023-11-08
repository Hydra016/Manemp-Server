const express = require('express');
const { setupShop, updateUser, getBusiness } = require('../controllers/UserController');
const router = express.Router();

router.post('/shop', setupShop);
router.put('/completeSetup', updateUser);
router.post('/searchShop', getBusiness)

module.exports = router;