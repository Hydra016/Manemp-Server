const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');

const createEmployee = async (req, res) => {
    const employee = new Employee({
        name: req.body.name
    })

    const empName = await employee.save();
    res.status(200).json({ success: true, data: empName })
}

const getAllEmployees = async (req, res) => {

}

module.exports = {
    createEmployee,
}