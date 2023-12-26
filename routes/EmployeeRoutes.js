const express = require('express');
const router = express.Router();
const { createEmployee, getEmployeesForRequest, getEmployeeForBusiness, setEmployeeSalary, getEmployee, removeEmployee } = require('../controllers/EmployeeController');

router.post("/employee/create", createEmployee)
router.post("/getEmployeesById", getEmployeesForRequest);
router.post("/myEmployees", getEmployeeForBusiness);
router.put("/setSalary", setEmployeeSalary);
router.post("/employee", getEmployee);
router.delete("/employee/remove", removeEmployee);

module.exports = router