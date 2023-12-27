const Employee = require("../models/Employee");
const Request = require("../models/Request");
const Shift = require("../models/Shift");
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
    res.status(500).json({ error: "Server error" });
  }
};

const getEmployeeForBusiness = async (req, res) => {
  try {
    const { shopId } = req.body;
    const employees = await Employee.find({ "shops.shopId": shopId });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const setEmployeeSalary = async (req, res) => {
  try {
    const { empId, salary } = req.body;

    const employee = await Employee.findById(empId);
    await employee
      .set({
        salary,
      })
      .save();

    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getEmployee = async (req, res) => {
  try {
    const { empId } = req.body;

    const employee = await Employee.find({ googleId: empId });
    res.status(200).json({ success: true, employee })
  } catch (err) {
    res.status(500).send("Internal Server Error")
  }
}

const removeEmployee = async (req, res) => {
  try {
    const { businessId, employeeId } = req.body;
    const result = await Employee.findOneAndUpdate(
      { googleId: employeeId, 'shops.shopId': businessId },
      {
        $pull: { 'shops': { shopId: businessId } },
        $set: { salary: null } 
      },
      { new: true }
    );
    await Request.findOneAndDelete({ businessId, employeeId });
    const removedShifts = await Shift.deleteMany({ shopId: businessId, employeeId });

    if (!result) {
      return res.status(404).json({ message: 'remvoed' });
    }

    res.json({ message: removedShifts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  createEmployee,
  getEmployeesForRequest,
  getEmployeeForBusiness,
  setEmployeeSalary,
  getEmployee,
  removeEmployee
};
