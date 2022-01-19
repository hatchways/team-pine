const Request = require("../models/Request");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler")

// @route POST /requests
// @desc Create new request
// @access Public
exports.createRequest = asyncHandler(async (req, res, next) => {
  const { requester, sitter, petIds, startDate, endDate } = req.body
  const request = await Request.create({requester, sitter, petIds, startDate, endDate});

  if (request) {
    res.status(200).json({
      success: {
        request: {
          ...request
        }
      }
    })
  }
});

// @route PUT /requests/edit/:requestId
// @desc edit request
// @access Public
exports.editRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.requestId)

  if (!request) {
    res.status(404);
    throw new Error("Request doesn't exist");
  }
  // Until we implement cancelling bookings, owners shouldn't be able to edit bookings
  if (request.sitter == req.user.id) {
    const { status } = req.body
    request.set({status})
    const updatedRequest = await request.save();
    res.status(200).json({
      success: {
        request: updatedRequest
      },
    });
  } else {
    res.status(403);
    throw new Error ("You are not authorized to perform this operation")
  }
});

// @route GET /requests
// @desc get requests of logged in user
// @access Private
exports.getUserRequests = asyncHandler(async (req, res, next) => {
  const requests = await Request.where({ $or: [{ sitter: req.user.id }, { requester: req.user.id }] });
  const requestProfiles = []
  for (let i = 0; i < requests.length; i++) {
    requestProfiles[i] = await Profile.findOne({$and: [{ $or: [{ userId: requests[i].sitter}, { userId: requests[i].requester}]}, { userId: { $ne: req.user.id }}]})
  }

  res.status(200).json({ requests: requests, requestProfiles: requestProfiles })
})