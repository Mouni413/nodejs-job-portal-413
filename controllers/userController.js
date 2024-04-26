import userModel from "../models/userModel.js";

export const userController = async (req, res, next) => {
  const { name, lastName, email, location } = req.body;

  if (!name || !lastName || !email || !location) {
    next("Provide all fields to update");
  }
  const user = await userModel.findOne({ _id: req.user.userId });
  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.location = location;
  await user.save();
  const token = user.createJson();
  res.status(200).json({
    user,
    token,
  });
};
