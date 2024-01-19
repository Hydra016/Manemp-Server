const express = require('express');
const router = express.Router();
const { setSchedule, getSchedule, deleteSchedule } = require('../controllers/ScheduleController');

router.post('/schedule/create', setSchedule);
router.post('/schedule', getSchedule);
router.delete("/schedule/delete", deleteSchedule)

module.exports = router;