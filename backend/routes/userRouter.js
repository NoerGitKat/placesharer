const express = require("express");

const userRouter = express.Router();

// Controllers
const { getAllUsers } = require("./../controllers/users-controllers");
const { createUser } = require("./../controllers/users-controllers");
const { logUserIn } = require("./../controllers/users-controllers");

// Validators
const validateSignup = require("./../middlewares/validation/validateSignup");

userRouter.route("/").get(getAllUsers);
userRouter.route("/signup").post(validateSignup, createUser);
userRouter.route("/login").post(logUserIn);

module.exports = userRouter;
