const Profile = require("../models/Profile");

const fetchProfile = async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).send("Not authorized");
  }

  const profile = await Profile.findOne({ userId: req.user.id });
  if (!profile) {
    return res.status(401).send("Profile is not exists!!");
  }

  req.profile = profile;
  next();
};

module.exports = fetchProfile;
