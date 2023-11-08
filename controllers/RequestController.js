const Employee = require("../models/Employee");
const Request = require("../models/Request");
const User = require("../models/User");

const sendRequest = async (req, res) => {
  const { businessId, employeeId } = req.body;

  const existingRequest = await Request.findOne({
    businessId,
  });

  if (existingRequest) {
    res.status(200).json({
      success: false,
      msg: "Already made request",
    });
  } else {
    await new Request({
      businessId,
      employeeId,
      pending: 1,
    }).save();

    const business = await User.findOne({ googleId: businessId });

    res.status(200).json({
      success: true,
      data: business,
    });
  }
};

const requestSelection = async (req, res) => {
  const { employeeId, businessId } = req.body;

  try {
    if (employeeId) {
      const requests = await Request.find({ employeeId });

      const businessIds = requests.map((request) => request.businessId);

      const businesses = await User.find({ googleId: { $in: businessIds } });

      res.status(200).json({ success: true, data: businesses });
    } else {
      const requests = await Request.find({ businessId });

      const employeeId = requests.map((request) => request.employeeId);

      const employees = await Employee.find({ googleId: { $in: employeeId } });

      res.status(200).json({ success: true, data: employees });
    }
  } catch (error) {
    res.status(500).json({ error: "Interal server error" });
  }
};

const getRequests = (req, res) => {
  requestSelection(req, res);
};

const deleteRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    await Request.findByIdAndDelete({ _id: requestId });

    requestSelection(req, res);
  } catch (err) {
    res.status(200).json({ success: "false", msg: "delete failed" });
  }
};

module.exports = {
  sendRequest,
  getRequests,
  deleteRequest,
};
