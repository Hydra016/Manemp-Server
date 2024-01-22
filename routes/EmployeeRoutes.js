const express = require('express');
const router = express.Router();
const { createEmployee, getEmployeesForRequest, getEmployeeForBusiness, setEmployeeSalary, getEmployee, removeEmployee, getTotalSalary, getMonthlyHours } = require('../controllers/EmployeeController');

router.post("/employee/create", createEmployee)
router.post("/getEmployeesById", getEmployeesForRequest);
router.post("/myEmployees", getEmployeeForBusiness);
router.post("/MonthlySalary", getTotalSalary);
router.post("/monthlyHours", getMonthlyHours)
router.put("/setSalary", setEmployeeSalary);
router.post("/employee", getEmployee);
router.delete("/employee/remove", removeEmployee);

module.exports = router