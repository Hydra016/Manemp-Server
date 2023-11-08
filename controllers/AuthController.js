const Owner = require("../models/Owner");
const Employee = require("../models/Employee");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const selectUserRole = async (req, res) => {
  const { role, user_id } = req.body;

  const user = await User.findOne({ id: user_id });

  if (role === "owner") {
    const owner = await Owner.findOne({ id: user_id });

    if (owner) {
      return;
    } else {
      const newOwner = await new Owner({
        googleId: user.googleId,
        givenName: user.givenName,
        familyName: user.familyName,
        email: user.email,
        role: "Owner",
      });
      await newOwner.save();
    }
  }

  if (role === "employee") {
    const employee = await Employee.findOne({ id: user_id });

    if (employee) {
      return;
    } else {
      const newEmployee = await new Employee({
        googleId: user.googleId,
        givenName: user.givenName,
        familyName: user.familyName,
        email: user.email,
        role: "Employee",
      });

      await newEmployee.save();
    }
  }
};

const loginUser = async (req, res) => {
  const { _id } = req.body;

  const validUser = await User.find({googleId: _id});
  
  const token = jwt.sign({validUser}, "TOP_SECRET_KEY")
  res.send(token)
}

module.exports = {
  selectUserRole,
  loginUser
};
