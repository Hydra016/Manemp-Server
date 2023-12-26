const Shift = require('../models/Shift');

const createShift = async (req, res) => {
    const { shiftData, shopId} = req.body;

    await shiftData.map(async shift => {
        await new Shift({
            day: shift.day,
            start: shift.start,
            end: shift.end,
            hours: shift.hours,
            employeeId: shift.employeeId,
            shopId: shift.shopId,
            amount: shift.amount
        }).save()
    })

    const newShifts = await Shift.find({ shopId })
    res.status(200).json({ success: true, data: newShifts })
}

const getShift = async (req, res) => {
    const { shopId } = req.body;
    try {
        const shifts = await Shift.find({ shopId });
        res.status(200).send({ success: true, data: shifts })
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
}

const deleteShift = async (req, res) => {
    const { shifts, shopId } = req.body;
    try {
        await Promise.all(shifts.map(async (shiftId) => {
            return await Shift.findByIdAndDelete({ _id: shiftId });
        }));
        const newShifts = await Shift.find({ shopId });
        res.status(200).send({ success: true, data: newShifts })

    }
    catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
}

const getShiftByEmployee = async (req, res) => {
    const { employeeId, shopId } = req.body;

    try {
        if(shopId === 'all') {
            const shifts = await Shift.find({ employeeId });
            res.status(200).send({ success: true, data: shifts })
        } else {
            const shifts = await Shift.find({ employeeId, shopId });
            res.status(200).send({ success: true, data: shifts })
        }
        
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
}

module.exports = {
    createShift,
    getShift,
    deleteShift,
    getShiftByEmployee
}