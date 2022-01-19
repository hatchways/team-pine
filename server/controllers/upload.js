const asyncHandler = require("express-async-handler");
const { s3 } = require("../cloud storage/amazonS3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const Profile = require("../models/Profile");
const { deleteFileFromS3bucket } = require("./delete");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Not an image! Please upload images only.", false);
  }
};

const upload = (bucketName, filename) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, filename);
      },
    }),
    fileFilter: imageFilter,
  });

// @route POST /upload/profile-pic
// @desc upload profile photo
// @access Private
exports.uploadProfilePic = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  if (!profile) {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }

  const filename = `profile-pics/${Date.now()}`;
  const bucket = process.env.AWS_BUCKET_NAME;

  try {
    const uploadSingle = upload(bucket, filename).single("image");

    uploadSingle(req, res, async (err) => {
      if (err) return res.status(400).json({ error: { message: err } });

      if (profile.photo !== "") {
        try {
          deleteFileFromS3bucket(bucket, profile.photo);
        } catch (err) {
          console.error(err);
        }
      }
      profile.set({ photo: req.file.location });
      const updatedProfile = await profile.save();
      res.status(200);
      res.json({
        success: {
          profile: {
            address: updatedProfile.address,
            birthday: updatedProfile.birthday,
            description: updatedProfile.description,
            gender: updatedProfile.gender,
            name: updatedProfile.name,
            photo: updatedProfile.photo,
            telephone: updatedProfile.telephone,
          },
        },
      });
    });
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});
