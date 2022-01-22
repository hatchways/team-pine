const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { createRequest, editRequest, getUserRequests } = require("../controllers/request");

router.route("/").post(protect, createRequest);

router.route("/edit/:requestId").put(protect, editRequest);

router.route("/").get(protect, getUserRequests)

module.exports = router;