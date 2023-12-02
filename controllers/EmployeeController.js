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

const getEmployeesForRequest = async (req, res) => {
  try {
    const { ids } = req.body;

    const objectIdArray = ids.map((id) => new mongoose.Types.ObjectId(id));

    const employees = await Employee.find({ _id: { $in: objectIdArray } });

    res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error(error);
    zq;
    res.status(500).json({ error: "Server error" });
  }
};

const getEmployeeForBusiness = async (req, res) => {
  try {
    const { shopId } = req.body;
    const employees = await Employee.find({ shops: { $in: [shopId] } });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createEmployee,
  getEmployeesForRequest,
  getEmployeeForBusiness,
};
