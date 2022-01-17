const Request = require("../models/Request");
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

// @route PUT /requests/edit/:requestId?userType=
// @desc edit request
// @access Public
exports.editRequest = asyncHandler(async (req, res, next) => {
  // Until we implement cancelling bookings, owners shouldn't be able to edit bookings
  if (req.query.userType != "sitter") {
    res.status(401);
    throw new Error ("Invalid user type for this operation")
  }
  const request = await Request.findById(req.params.requestId)
  
  if (!request) {
    res.status(404);
    throw new Error("Request doesn't exist");
  }

  const { status, paid } = req.body
  if (status) {
    request.set({status})
  }
  if (paid != null) {
    request.set({paid})
  }
  const updatedRequest = await request.save();
  res.status(200).json({
    success: {
      request: updatedRequest
    },
  });
});

// @route GET /requests/:userId?userType=
// @desc get requests of logged in user
// @access Private
exports.getUserRequests = asyncHandler(async (req, res, next) => {
  const requests = await Request.where(req.query.userType, req.params.userId);

  res.status(200).json({
    success: {
      requests: requests
    }
  })
})