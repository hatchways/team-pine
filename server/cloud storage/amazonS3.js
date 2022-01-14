const AWS = require("aws-sdk");

const bucket = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const creds = new AWS.Credentials(accessKeyId, secretAccessKey);

exports.s3 = new AWS.S3({
  region,
  credentials: creds,
});

// // upload file to bucket
// exports.uploadFileToBucket = (file, key) => {
//   const fileStream = fs.createReadStream(file.path);

//   const uploadParams = {
//     Bucket: bucket,
//     Body: fileStream,
//     Key: `${key}/${file.filename}`,
//   };
//   return s3.upload(uploadParams).promise();
// };
