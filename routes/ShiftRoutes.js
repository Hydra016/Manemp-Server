const express = require('express');
const router = express.Router();
const { createShift, getShift, deleteShift } = require('../controllers/ShiftController');

router.post("/shift/create", createShift)
router.get("/shifts", getShift)
router.delete("/delete", deleteShift)

module.exports = router