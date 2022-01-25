const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const Schedule = require("../models/Schedule");
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
  const result = [];
  const date = availability.split("_", 2);
  const dropInDate = date[0];
  const dropOffDate = date[1];

  const profiles = await Profile.find({
    location: { $regex: `.*${location.toLowerCase()}.*` },
    isSitter: true,
  });

  const profile = profiles.map((profile) => profile._id.toString());

  try {
    const schedules = await Schedule.find()
      .where("profileId")
      .in(profile)
      .exec();

    for (const schedule of schedules) {
      if (schedule.days[dropInDate] && schedule.days[dropOffDate]) {
        if (
          schedule.days[dropInDate].isAvailable === true &&
          schedule.days[dropOffDate].isAvailable === true
        ) {
          result.push(schedule.profileId);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

  const foundProfiles = await Profile.find().where("_id").in(result).exec();

  console.log(foundProfiles);

  res.status(200).json({
    success: {
      profiles: foundProfiles,
    },
  });
});
// @route GET /profile/load/:profileId
// @route Get user profile data based on id
// @access Public
exports.loadProfileById = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.profileId);
  if (!profile || !profile.isSitter) {
    res.status(403);
    throw new Error("Invalid profile");
  }

  res.status(200).json({
    success: {
      profile,
    },
  });
});
