const asyncHandler = require("express-async-handler");
const { s3 } = require("../cloud storage/amazonS3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const Profile = require("../models/Profile");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload images only."));
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

exports.uploadProfilePic = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  if (!profile) {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }

  //get the image from request
  const filename = `${req.user.id}-profile-pic.jpg`;
  const bucket = process.env.AWS_BUCKET_NAME;

  try {
    const uploadSingle = upload(bucket, filename).single("image");

    uploadSingle(req, res, (err) => {
      if (err) return res.status(400).json(err);

      profile.set({ photo: req.file.location });
      profile.save().then((profile) => {
        res.status(200);
        res.json({ profile });
      });
    });
  } catch (err) {
    res.status(404);
    throw new Error({ error: err });
  }
});
