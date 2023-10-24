const express = require('express');
const router = express.Router();
const { createEmployee } = require('../controllers/EmployeeController');

router.post("/employee/create", createEmployee)

module.exports = router