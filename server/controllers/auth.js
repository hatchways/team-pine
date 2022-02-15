const User = require("../models/User");
const Profile = require("../models/Profile");
const ResetToken = require("../models/ResetToken");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }

  const userExists = await User.findOne({ name });

  if (userExists) {
    res.status(400);
    throw new Error("A user with that username already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const profile = await Profile.create({
      userId: user._id,
      name,
    });

    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(201).json({
      success: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(200).json({
      success: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const profile = await Profile.findOne({ userId: req.user.id });

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      profile,
    },
  });
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");

  res.send("You have successfully logged out");
});

// @route POST /auth/send-password-reset
// @desc Send password reset email to user
// @access Public
exports.sendPasswordResetEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("Email not found");
  }

  const token = generateToken(user.id, "30m");
  await ResetToken.create({ token, user });
  const link = `${req.protocol}://localhost:3000/password-reset/${email}/${token}`;

  const msg = {
    to: user.email,
    from: "lovingsittertest@gmail.com",
    subject: "Password Reset",
    html: `
    <div>You have requested a password reset. Click on the link to reset. This link will expire in 30 minutes.</div><br />
    <div>Reset Link: ${link}</div><br />
    <div>If you did not request this, please contact us immediately at support@lovingsitter.com</div>
    `
  }

  await sgMail.send(msg)
  
  res.status(200).json({
    success: {
      message: "Password reset link successfully sent to email on your account"
    }
  });
});

// @route PUT /auth/reset-password
// @desc Reset user password
// @access Private
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { email, token, password } = req.body;

  const user = await User.findOne({ email });
  const resetToken = await ResetToken.findOne({ user });

  if (resetToken && (await resetToken.matchToken(token))) {
    user.set("password", password);
    await user.save();
    ResetToken.deleteMany({ user });
    res.status(200).json({
      success: {
        message: "Password successfully updated. You may now login with the new password."
      }
    });
  } else {
    res.status(401);
    throw new Error('Invalid token');
  }
});