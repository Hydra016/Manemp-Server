const Employee = require("../models/Employee");
const Request = require("../models/Request");
const User = require("../models/User");

const sendRequest = async (req, res) => {
  const { businessId, employeeId } = req.body;

  try {
    const existingRequest = await Request.findOne({
      businessId,
    });

    if (existingRequest) {
      const requests = await Request.find({ employeeId });

      res.status(200).json({
        success: true,
        data: requests,
      });
    } else {
      await new Request({
        businessId,
        employeeId,
        status: {
          pending: 1,
        },
      }).save();

      const requests = await Request.find({ employeeId });

      res.status(200).json({
        success: true,
        data: requests,
      });
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const deleteRequest = async (req, res) => {
  const { requestId, userId } = req.body;
  try {
    await Request.findByIdAndDelete({ _id: requestId });
    const requests = await Request.find({
      $or: [{ businessId: userId }, { employeeId: userId }],
    });
    res.status(200).json({ success: true, data: requests });
  } catch (err) {
    res.status(200).json({ success: "false", msg: "delete failed" });
  }
};

const fetchRequests = async (req, res) => {
  const { userId } = req.body;

  try {
    const requests = await Request.find({
      $or: [{ businessId: userId }, { employeeId: userId }],
    });

    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const fetchRequestData = async (req, res) => {
  const { businessId, employeeId } = req.body;

  try {
    if (businessId) {
      const business = await User.findOne({ googleId: businessId });
      res.status(200).json({ success: true, data: business });
    } else if (employeeId) {
      const employee = await Employee.findOne({ googleId: employeeId });
      res.status(200).json({ success: true, data: employee });
    } else {
      res.status(404).send("request not found");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const acceptRequest = async (req, res) => {
  const { employeeId, requestId, userId } = req.body;

  console.log(employeeId, requestId, userId )

  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { googleId: employeeId, shops: { $ne: userId } },
      { $push: { shops: userId } },
      { new: true }
    );

    const foundRequest = await Request.findById(requestId);
    foundRequest.set({
      status: {
        pending: 0,
        accepted: 1,
      },
    }).save();

    const requests = await Request.find({
      $or: [{ businessId: userId }, { employeeId: userId }],
    });

    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ message: "Employee not found or shop already associated" });
    }
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  sendRequest,
  acceptRequest,
  deleteRequest,
  fetchRequestData,
  fetchRequests,
};
