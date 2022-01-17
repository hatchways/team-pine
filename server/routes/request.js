const express = require("express");
const router = express.Router();
const { validateUserTypeQuery } = require("../validate")
const protect = require("../middleware/auth");
const { createRequest, editRequest, getUserRequests } = require("../controllers/request");

router.route("/create").post(protect, createRequest);

router.route("/edit/:requestId").put(protect, editRequest);

router.route("/").get(protect, validateUserTypeQuery, getUserRequests)

module.exports = router;