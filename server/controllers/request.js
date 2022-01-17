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
  const requests = await Request.where(req.query.userType, req.body.user.id);

  res.status(200).json({
    success: {
      requests: requests
    }
  })
})