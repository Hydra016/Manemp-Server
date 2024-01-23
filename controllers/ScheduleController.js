const Schedule = require("../models/Schedule");

const errMsg = "Internal server error";

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
    res.status(500).send(errMsg);
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
    res.status(500).json({ msg: errMsg });
  }
};

const calculateUpcomingShifts = (shifts) => {
  const now = new Date();

  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(now);
  endOfWeek.setDate(endOfWeek.getDate() + 7 - endOfWeek.getDay());
  endOfWeek.setHours(23, 59, 59, 999);

  const shiftsInCurrentWeek = shifts.filter((shift) => {
    const shiftStart = new Date(shift.start);
    return shiftStart >= startOfWeek && shiftStart <= endOfWeek;
  });

  shiftsInCurrentWeek.sort((a, b) => {
    const dateComparison = new Date(a.start) - new Date(b.start);
    return dateComparison !== 0 ? dateComparison : a.day - b.day;
  });

  const nextTwoShifts = shiftsInCurrentWeek.slice(0, 2);

  return nextTwoShifts;
};

const getUpcomingShifts = async (req, res) => {
  const { shopId, empId } = req.body;

  if (shopId) {
    const schedule = await Schedule.find({ shopId });
    res.status(200).json({ success: true, data: schedule });
  }

  if (empId) {
    const schedule = await Schedule.find({ employeeId: empId });
    const nextShifts = calculateUpcomingShifts(schedule);
    res.status(200).json({ success: true, data: nextShifts });
  }
};

module.exports = {
  setSchedule,
  getSchedule,
  deleteSchedule,
  getUpcomingShifts,
};
