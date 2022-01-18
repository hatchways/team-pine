const express = require("express");
const router = express.Router();
const { validateCreateRequest } = require("../validate")
const protect = require("../middleware/auth");
const { createRequest, editRequest, getUserRequests } = require("../controllers/request");

router.route("/").post(protect, validateCreateRequest, createRequest);

router.route("/edit/:requestId").put(protect, editRequest);

router.route("/").get(protect, getUserRequests)

module.exports = router;