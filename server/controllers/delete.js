const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const { s3 } = require("../cloud storage/amazonS3");

const deleteFileFromS3bucket = (bucketName, fileName) => {
  s3.deleteObject({ Bucket: bucketName, Key: fileName }, (err, res) => {
    if (err) throw err;
  });
};

// @route DELETE /delete/profile-pic
// @desc Delete profile photo
// @access Private
exports.deleteProfilePic = asyncHandler(async (req, res, next) => {
  // get the profile
  const profile = await Profile.findOne({ userId: req.user.id });
  if (!profile) {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }
  if (profile.photo === "") {
    res.status(404);
    throw new Error("Profile photo is not exists!!!");
  }
  const filename = profile.photo;
  const bucket = process.env.AWS_BUCKET_NAME;
  try {
    deleteFileFromS3bucket(bucket, filename);
    profile.set({ photo: "" });
    profile.save().then((profile) => {
      res.status(200);
      res.json({
        success: {
          profile: {
            address: profile.address,
            birthday: profile.birthday,
            description: profile.description,
            gender: profile.gender,
            name: profile.name,
            photo: profile.photo,
            telephone: profile.telephone,
          },
        },
      });
    });
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

exports.deleteFileFromS3bucket = deleteFileFromS3bucket;
