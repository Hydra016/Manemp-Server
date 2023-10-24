const express = require('express');
const { setupShop, updateUser } = require('../controllers/UserController');

const router = express.Router();

router.post('/shop', setupShop);
router.put('/completeSetup', updateUser);

module.exports = router;