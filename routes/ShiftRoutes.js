const express = require('express');
const router = express.Router();
const { createShift, getShift, deleteShift, getShiftByEmployee } = require('../controllers/ShiftController');

router.post("/shift/create", createShift)
router.get("/shifts", getShift)
router.delete("/delete", deleteShift)
router.post("/employeeShifts", getShiftByEmployee)

module.exports = router