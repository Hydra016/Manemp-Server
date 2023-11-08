const User = require("../models/User");

const loginUser = async (req, res) => {
  const { _id, password } = req.body;

  const validUser = await User.find({googleId: _id});
  console.log(validUser.password)
  if(!!validUser | password !== validUser.password) {
    res.send('invalid')
  } else {
    res.send(validUser)
  }
  
}

const updateUser = async (req, res) => {
  const { id, shopName, password, shopType } = req.body;

  const user = await User.findById(id);
  user.set({
    shopName,
    password,
    shopType
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

const getBusiness = async (req,res) => {
  const { shopId } = req.body 
  const foundBusiness = await User.findOne({ googleId: shopId });

  if(foundBusiness) {
    res.status(200).json({ success: true, data: foundBusiness })
  } else {
    res.status(200).json({ success: false, msg: 'user not found' })
  }
}


module.exports = {
  setupShop,
  updateUser,
  loginUser,
  getBusiness
};
