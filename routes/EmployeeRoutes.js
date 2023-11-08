const express = require('express');
const router = express.Router();
const { createEmployee, getEmployeesForRequest } = require('../controllers/EmployeeController');

router.post("/employee/create", createEmployee)
router.post("/getEmployeesById", getEmployeesForRequest);

module.exports = router