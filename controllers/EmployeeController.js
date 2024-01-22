const Employee = require("../models/Employee");
const Request = require("../models/Request");
const Shift = require("../models/Shift");
const mongoose = require("mongoose");

const errorMsg = "Internal server error";

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
    res.status(500).json({ error: errorMsg });
  }
};

const getEmployeeForBusiness = async (req, res) => {
  try {
    const { shopId } = req.body;
    const employees = await Employee.find({ "shops.shopId": shopId });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send(errorMsg);
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
    res.status(500).send(errorMsg);
  }
};

const getEmployee = async (req, res) => {
  try {
    const { empId } = req.body;

    const employee = await Employee.find({ googleId: empId });
    res.status(200).json({ success: true, employee });
  } catch (err) {
    res.status(500).send(errorMsg);
  }
};

const removeEmployee = async (req, res) => {
  try {
    const { businessId, employeeId } = req.body;
    const result = await Employee.findOneAndUpdate(
      { googleId: employeeId, "shops.shopId": businessId },
      {
        $pull: { shops: { shopId: businessId } },
        $set: { salary: null },
      },
      { new: true }
    );
    await Request.findOneAndDelete({ businessId, employeeId });
    const removedShifts = await Shift.deleteMany({
      shopId: businessId,
      employeeId,
    });

    if (!result) {
      return res.status(404).json({ message: "remvoed" });
    }

    res.json({ message: removedShifts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: errorMsg });
  }
};

const giveMonthlySalary = (allShifts) => {
  const d = new Date();
  let currentMonth = d.getMonth() + 1;
  let currentYear = d.getFullYear();

  let previousMonth = currentMonth - 1;
  let previousYear = currentYear;

  if (previousMonth === 0) {
    previousMonth = 12;
    previousYear -= 1;
  }

  const shiftsInCurrentMonth = allShifts.filter((shift) => {
    const shiftDate = new Date(shift.start);
    return (
      shiftDate.getMonth() + 1 === currentMonth &&
      shiftDate.getFullYear() === currentYear
    );
  });

  const shiftsInPreviousMonth = allShifts.filter((shift) => {
    const shiftDate = new Date(shift.start);
    return (
      shiftDate.getMonth() + 1 === previousMonth &&
      shiftDate.getFullYear() === previousYear
    );
  });

  const salaryCurrentMonth = shiftsInCurrentMonth.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );

  const salaryPreviousMonth = shiftsInPreviousMonth.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );

  return { salaryCurrentMonth, salaryPreviousMonth };
};

const getTotalSalary = async (req, res) => {
  try {
    const { empId, shopId } = req.body;

    if (shopId === "all") {
      const allShifts = await Shift.find({ employeeId: empId });
      const salaries = giveMonthlySalary(allShifts);
      res.status(200).json({ success: true, data: salaries });
    } else {
      const allShifts = await Shift.find({ employeeId: empId, shopId });
      const salaries = giveMonthlySalary(allShifts);
      res.status(200).json({ success: true, data: salaries });
    }
  } catch (err) {
    res.status(500).send(errorMsg);
  }
};

const monthlyHours = (allShifts) => {
  const d = new Date();
  const currentYear = d.getFullYear();

  const monthlyHoursArray = Array.from({ length: 12 }, () => 0);

  allShifts.forEach((shift) => {
    const shiftDate = new Date(shift.start);
    const shiftYear = shiftDate.getFullYear();
    const shiftMonth = shiftDate.getMonth();

    if (shiftYear === currentYear) {
      monthlyHoursArray[shiftMonth] += shift.hours;
    }
  });

  return monthlyHoursArray;
};

const getMonthlyHours = async (req, res) => {
  try {
    const { empId, shopId } = req.body;

    if (shopId === "all") {
      const allShifts = await Shift.find({ employeeId: empId });
      const hours = monthlyHours(allShifts);
      res.status(200).json({ success: true, data: hours });
    } else {
      const allShifts = await Shift.find({ employeeId: empId, shopId });
      const hours = monthlyHours(allShifts);
      res.status(200).json({ success: true, data: hours });
    }
  } catch (err) {
    res.status(500).send(errorMsg);
  }
};

module.exports = {
  createEmployee,
  getEmployeesForRequest,
  getEmployeeForBusiness,
  setEmployeeSalary,
  getEmployee,
  removeEmployee,
  getTotalSalary,
  getMonthlyHours,
};
