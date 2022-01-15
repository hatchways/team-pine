const Request = require("../models/Request");
const asyncHandler = require("express-async-handler")

// @route POST /requests/create
// @desc Create new request
// @access Public
exports.createRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.create(req.body);

  if (request) {
    res.status(200).json({
      success: {
        request: {
          ...request
        }
      }
    })
  } else {
    res.status(400);
    throw new Error("Invalid request data")
  }
});

// @route PUT /request/edit
// @desc edit request
// @access Public
exports.editRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findOne({ _id: req.request._id })
  
  if (!request) {
    res.status(404);
    throw new Error("Request doesn't exist");
  }
  request.set(req.body);
  const updatedRequest = await request.save();
  res.status(200).json({
    success: {
      request: updatedRequest
    },
  });
});

// @route GET /requests
// @desc get requests of logged in user
// @access Private
exports.getUserRequests = asyncHandler(async (req, res, next) => {
  const requests = await Request.where('requester', req.userId);

  if (!requests) {
    res.status(404);
    throw new Error("User has no requests or is not logged in")
  }

  res.status(200).json({
    success: {
      requests: requests
    }
  })
})

// @route PATCH /request/edit/status
// @desc edit request status
// @access Public
exports.acceptRequest = asyncHandler((req, res, next) => {
  const request = await Request.findOne({_id: req.request._id})

  if (!request) {
    res.status(404);
    throw new Error("No request found")
  }

  request.status.set(req.body.status);
  const updatedRequest = await request.save();
  res.status(200).json({
    success: {
      request: updatedRequest
    }
  })
})