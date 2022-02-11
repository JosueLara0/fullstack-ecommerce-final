// Libraries
const express = require("express");

// Controller
const {
  createUser,
  getUserById,
  updateUser,
  disableUserAccount,
  loginUser,
} = require("../controllers/users.controller");

// Middlewares
const {
  createUserValidations,
  updateUserValidations,
  loginUserValidations,
  validateResult,
} = require("../middlewares/validators.middleware");

const {
  protectSession,
  protectSessionOwner,
} = require("../middlewares/auth.middleware");

const router = express.Router();

// Post - Create new user
router.post("/", createUserValidations, validateResult, createUser);

// Post - login
router.post("/login", loginUserValidations, validateResult, loginUser);

router.use(protectSession);

// Get - get user profile
// Patch - update user profile (email, name)
// Delete - disable user account
router
  .route("/:id")
  .get(getUserById)
  .patch(protectSessionOwner, updateUserValidations, validateResult, updateUser)
  .delete(protectSessionOwner, disableUserAccount);

module.exports = { userRouter: router };
