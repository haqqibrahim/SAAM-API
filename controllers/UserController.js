const User = require("../Models/User.js");

// Create User controller
exports.createUser = async (req, res) => {
  // Destructure the data
  const { userId, fullName, nickName, phoneNumber, email, DOB } = req.body;

  // Checking if userId already exists
  const existingUser = await User.findOne({ userId });
  if (existingUser) {
    return res.status(409).json({ messge: "User Already Exist!" });
  }

  // Check if nickName is available
  const existingNickName = await User.findOne({ nickName });
  if (existingNickName) {
    return res.status(409).json({ messge: "Nickname not available" });
  }

  // Check if phoneNumber already exists
  const existingNumber = await User.findOne({ phoneNumber });
  if (existingNumber) {
    return res.status(409).json({ messge: "Phone number has been used" });
  }

  // check if email already exists
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(409).json({ messge: "Email has been used" });
  }

  // Create User Obj
  const user = new User({
    userId,
    fullName,
    nickName,
    phoneNumber,
    email,
    DOB,
  });

  // Save the user in to DB
  await user.save();

  // Send a response to the user
  res.status(200).json({ message: "Profile Created Successfully" });
};

// Update User Controller
exports.updateUser = async (req, res) => {
  // Destructure the data
  const { userId, fullName, nickName, phoneNumber, email, DOB } = req.body;

  // Checking if userId exists
  const existingUser = await User.findOne({ userId });
  if (!existingUser) {
    return res.status(409).json({ messge: "User Does not exists!" });
  }


  // Update user detailes in DB
  await User.updateOne(
    { userId },
    {
      $set: {
        fullName,
        nickName,
        phoneNumber,
        email,
        DOB,
      },
    }
  );
  return res.status(200).json({ message: "Profile update successful" });
};
