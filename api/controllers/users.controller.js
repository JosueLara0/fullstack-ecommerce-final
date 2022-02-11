// Libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");

// Utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const { Email } = require("../utils/email");

dotenv.config({ path: "./config.env" });

// Controllers
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if a user exits with given email
  const user = await User.findOne({ where: { email, status: "available" } });

  // Check if email and password are valid
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Credentials are not valid", 404));
  }

  // Generate jwt
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 60 * 60 * 1000
    ),
  };

  // console.log(
  //   new Date(
  //     Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 60 * 60 * 1000
  //   ).toLocaleString()
  // );

  // Check if the url has the https protocol if is displayed in production
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: { user, token },
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    attributes: { exclude: ["password"] }, // user.password = undefined;
    where: { id },
  });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({ status: "success", data: { user } });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "standard",
  });

  // Remote password from response
  newUser.password = undefined;

  // Send welcome email to user
  await new Email(newUser.email).sendWelcome(newUser.name, newUser.email);

  res.status(201).json({ status: "success", data: { user: newUser } });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // const { id } = req.params;
  const { name, email } = req.body;
  const user = req.currentUser;

  // const user = await User.findOne({ where: { id } });

  // if (!user) {
  //   return next(new AppError("No user found with this id", 404));
  // }

  await user.update({ name, email });

  res.status(204).json({ status: "success" });
});

exports.disableUserAccount = catchAsync(async (req, res, next) => {
  // const { id } = req.params;

  // const user = await User.findOne({ where: { id } });

  // if (!user) {
  //   return next(new AppError("No user found", 404));
  // }

  const user = req.currentUser;

  await user.update({ status: "disabled" });

  res.status(204).json({ status: "success" });
});
