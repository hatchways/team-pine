const express = require("express");
const router = express.Router();
const { validateRegister, validateLogin } = require("../validate");
const protect = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  loadUser,
  logoutUser,
  sendPasswordResetEmail,
  resetPassword
} = require("../controllers/auth");

router.route("/register").post(validateRegister, registerUser);

router.route("/login").post(validateLogin, loginUser);

router.route("/user").get(protect, loadUser);

router.route("/logout").post(logoutUser);

router.route("/send-password-reset").post(sendPasswordResetEmail);

router.route("/reset-password").put(resetPassword);

module.exports = router;
