const express = require('express');
const router = express.Router();
const { setSchedule, getSchedule, deleteSchedule, getUpcomingShifts } = require('../controllers/ScheduleController');

router.post('/schedule/create', setSchedule);
router.post('/schedule', getSchedule);
router.delete("/schedule/delete", deleteSchedule)
router.post("/schedule/upcomingShifts", getUpcomingShifts);

module.exports = router;