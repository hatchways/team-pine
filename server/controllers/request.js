const Request = require("../models/Request");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { chargeCustomer } = require("./payment");

// @route POST /requests
// @desc Create new request
// @access Public
exports.createRequest = asyncHandler(async (req, res, next) => {
  const profileId = await Profile.findOne({ userId: req.user.id });
  const { sitter, startDate, endDate } = req.body;
  const request = await Request.create({
    requester: profileId,
    sitter,
    startDate,
    endDate,
  });

  if (request) {
    res.status(200).json({
      success: {
        request: {
          ...request,
        },
      },
    });
  } else {
    res.status(404);
    throw new Error("Request does not exist");
  }
});

// @route PUT /requests/edit/:requestId
// @desc edit request
// @access Public
exports.editRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.requestId);

  if (!request) {
    res.status(404);
    throw new Error("Request doesn't exist");
  }
  const profile = await Profile.findOne({ userId: req.user.id });
  if (request.sitter.toString() == profile._id.toString()) {
    const { status } = req.body;
    request.set("status", status);
    const updatedRequest = await request.save();
    if (updatedRequest.status === "accepted") {
      await chargeCustomer(updatedRequest.id);
    }
    res.status(200).json({
      success: {
        request: updatedRequest,
      },
    });
  } else {
    res.status(403);
    throw new Error("You are not authorized to perform this operation");
  }
});

// @route GET /requests
// @desc get requests of logged in user
// @access Private
exports.getUserRequests = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  if (profile.isSitter) {
    const requests = await Request.where("sitter", profile._id).populate(
      "requester"
    );
    res.status(200).json({ requests: requests });
  } else {
    res.status(403);
    throw new Error("You are not authorized to perform this operation");
  }
});
