const Schedule = require("../models/Schedule");

const setSchedule = async (req, res) => {
  const { shiftData, shopId } = req.body;

  await Promise.all(
    shiftData.map(async (shift) => {
      await new Schedule({
        day: shift.day,
        start: shift.start,
        end: shift.end,
        hours: shift.hours,
        employeeId: shift.employeeId,
        shopId: shift.shopId,
        amount: shift.amount,
      }).save();
    })
  );

  const newShifts = await Schedule.find({ shopId });
  res.status(200).json({ success: true, data: newShifts });
};

const getSchedule = async (req, res) => {
  try {
    const { shopId, empId } = req.body;

    if (shopId) {
      const schedule = await Schedule.find({ shopId });
      res.status(200).json({ success: true, data: schedule });
    }

    if (empId) {
      const schedule = await Schedule.find({ employeeId: empId });
      res.status(200).json({ success: true, data: schedule });
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

const deleteSchedule = async (req, res) => {
  const { shifts, shopId } = req.body;

  try {
    await Promise.all(
      shifts.map(async (shiftId) => {
        return await Schedule.findByIdAndDelete({ _id: shiftId });
      })
    );
    const newShifts = await Schedule.find({ shopId });
    res.status(200).send({ success: true, data: newShifts });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  setSchedule,
  getSchedule,
  deleteSchedule,
};
