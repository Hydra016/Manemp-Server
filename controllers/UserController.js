const User = require("../models/User");

const updateUser = async (req, res) => {
  const { id, shopName, password } = req.body;

  const user = await User.findById(id);
  user.set({
    shopName,
    password
  }).save()
  
  res.status(200).json({ success: true, data: user })
};

const setupShop = async (req, res) => {
  const { googleId, givenName, familyName, email, shopName, password } =
    req.body;

  const newUser = await new User({
    googleId,
    givenName,
    familyName,
    email,
    shopName,
    password,
  }).save();

  res.status(200).json({ data: newUser });
};

module.exports = {
  setupShop,
  updateUser,
};
