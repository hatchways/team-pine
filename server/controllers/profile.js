const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

// @route PUT /profile/edit
// @desc edit user profile
// @access Public
exports.editProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });

  if (!profile) {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }
  profile.set(req.body);
  const updatedProfile = await profile.save();
  res.status(200).json({
    success: {
      profile: updatedProfile,
    },
  });
});

// @route GET /profile/load
// @desc Get user profile data
// @access Private
exports.loadProfile = asyncHandler(async (req, res, next) => {
  const profile = await User.findById(req.user.id, "profile");

  if (!profile) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      profile: profile,
    },
  });
});

// @route GET /list-profiles/
// @desc Show profiles on list page according to availability and location
// @access Public
exports.getProfileListings = asyncHandler(async (req, res, next) => {
  const { availability, location } = req.query;
  console.log(req.query);

  const profiles = await Profile.find(
    { location: { $regex: `.*${location.toLowerCase()}.*` } },
    { isSitter: true }
  ).select("name description location photo payRate");

  res.status(200).json({
    success: {
      profiles,
    },
  });
});
