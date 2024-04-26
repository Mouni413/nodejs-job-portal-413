import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) {
    next("name is required");
  }
  if (!email) {
    next("email is required");
  }
  if (!password) {
    next("password is required and grater than 6 characters");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email already registered  please login");
  }
  const user = await userModel.create({ name, email, password });
  const token = user.createJson();
  res.status(201).send({
    success: true,
    message: "User created Succesfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next("please provide all fields");
  }
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("please provide valid username and password");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("please provide valid username and password");
  }
  user.password = undefined;
  const token = user.createJson();
  res.status(201).json({
    success: true,
    message: "User login successfully",
    user,
    token,
  });
};
