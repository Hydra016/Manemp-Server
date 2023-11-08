const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createEmployee = async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
  });

  const empName = await employee.save();
  res.status(200).json({ success: true, data: empName });
};

// const getSingleEmployee = async (req, res) => {
//     const { employeeId } = req.body;

//     const singleEmployee = await Employee.findOne(employeeId);
// }

const getEmployeesForRequest = async (req, res) => {
  try {
    const { ids } = req.body;

    const objectIdArray = ids.map((id) => new mongoose.Types.ObjectId(id));

    const employees = await Employee.find({ _id: { $in: objectIdArray } });

    res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error(error);zq     	
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createEmployee,
  getEmployeesForRequest,
};
