const express = require('express');
const router = express.Router();
const { createEmployee, getEmployeesForRequest, getEmployeeForBusiness } = require('../controllers/EmployeeController');

router.post("/employee/create", createEmployee)
router.post("/getEmployeesById", getEmployeesForRequest);
router.post("/myEmployees", getEmployeeForBusiness);

module.exports = router