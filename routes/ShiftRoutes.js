const express = require('express');
const router = express.Router();
const { createShift, getShift } = require('../controllers/ShiftController');

router.post("/shift/create", createShift)
router.get("/shifts", getShift)

module.exports = router