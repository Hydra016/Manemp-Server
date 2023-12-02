const Shift = require('../models/Shift');

const createShift = async (req, res) => {
    const { day, start, end, hours } = req.body;

    await new Shift({
        day,
        start,
        end,
        hours
    }).save()

    const shifts = await Shift.find();

    res.status(200).json({ success: true, data: shifts })
}

const getShift = async (req, res) => {
    try {
        const shifts = await Shift.find();
        res.status(200).send({ success: true, data: shifts })
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
}

const deleteShift = async (req, res) => {
    const { shifts } = req.body;
    try {
        await Promise.all(shifts.map(async (shiftId) => {
            return await Shift.findByIdAndDelete({ _id: shiftId });
        }));
        const newShifts = await Shift.find();
        res.status(200).send({ success: true, data: newShifts })

    }
    catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
}

module.exports = {
    createShift,
    getShift,
    deleteShift
}