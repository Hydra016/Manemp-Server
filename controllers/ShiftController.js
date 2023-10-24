const Shift = require('../models/Shift');

const createShift = async (req, res) => {
    const shift = new Shift({
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        totalTime: req.body.totalTime
    })

    const newShift = await shift.save();
    res.status(200).json({ success: true, data: newShift })
}

const getShift = async (req, res) => {
    const shifts = await Shift.find()
    res.status(200).json({data: shifts})
}

module.exports = {
    createShift,
    getShift
}