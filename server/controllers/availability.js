const asyncHandler = require('express-async-handler');
const Profile = require('../models/Profile');
const Schedule = require('../models/Schedule');

exports.createSchedule = asyncHandler(async (req, res, next) => {
  if (req.profile === undefined) {
    res.status(404);
    throw new Error('Unable to get profile of user');
  }
  const profileId = req.profile.id;
  const { name, days } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("schedule's name is required!!");
  }
  if (!days) {
    res.status(400);
    throw new Error("schedule's days object is required");
  }
  const newSchedule = new Schedule({
    name,
    profileId,
    days,
  });
  const savedSchedule = await newSchedule.save();
  if (!savedSchedule) {
    res.status(500);
    throw new Error('Unexpected Error: Unable to save new schedule');
  }
  if (req.profile.activeSchedule === undefined) {
    req.profile.set({ activeSchedule: savedSchedule.id });
    await req.profile.save();
  }
  res.status(201);
  res.send(savedSchedule);
});
// @route GET /availability/:scheduleId
// @desc Get Schedule by Id
// @access Private
exports.getSchedule = asyncHandler(async (req, res, next) => {
  const scheduleId = req.params.scheduleId;
  const schedule = await Schedule.findOne({ _id: scheduleId })
    .where('profileId')
    .equals(req.profile.id);
  if (schedule) {
    res.status(200);
    res.send(schedule);
  } else {
    res.status(404);
    res.send('schedule Nnot Found!!');
  }
});
// @route GET /availability
// @desc Get list of all schedules
// @access Private
exports.getAvailability = asyncHandler(async (req, res, next) => {
  const profile = req.profile;
  const schedules = await Schedule.find({ profileId: profile.id });
  if (!schedules) {
    schedules = [];
  }
  res.status(200);
  res.send(schedules);
});

// @route GET /availability/active
// @desc Get active schedule
// @access Private
exports.getActiveSchedule = asyncHandler(async (req, res, next) => {
  const profile = req.profile;
  const schedule = await Schedule.findOne({ _id: profile.activeSchedule });
  if (!schedule) {
    res.status(404);
    throw new Error('Schedule Not Found!!');
  }
  res.status(200);
  res.send(schedule);
});

// @route PATCH /availability/:scheduleId/activate
// @desc Set active schedule
// @access Private
exports.setActiveSchedule = asyncHandler(async (req, res, next) => {
  const scheduleId = req.params.scheduleId;
  const schedule = await Schedule.findOne({ _id: scheduleId });
  const profile = await Profile.findOne({ _id: req.profile.id });
  profile.set({ activeSchedule: schedule.id });
  const updatedProfile = await profile.save();
  res.status(200);
  res.send({
    success: {
      profile: updatedProfile,
    },
  });
});
