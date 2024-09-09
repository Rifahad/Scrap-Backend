const { pickupupload } = require("../model/pickup");
const {
  S3Client,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const crypto = require("crypto");

const randomImage = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

const AccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const SecretAccessKeyId = process.env.AWS_SECRET_ACCESS_KEY;
const bucketRegion = process.env.AWS_REGION;
const bucketName = process.env.AWS_S3_BUCKET_NAME;

const s3 = new S3Client({
  credentials: {
    accessKeyId: AccessKeyId,
    secretAccessKey: SecretAccessKeyId,
  },
  region: bucketRegion,
});

module.exports = {
  pickPost: async (req, res) => {
    try {
      const imageName = randomImage();
      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      await s3.send(new PutObjectCommand(params));
            const newdata = new pickupupload({
        ...req.body,
        pickupImage: imageName, 
      });
      await newdata.save();      
      res.status(200).json({ message: true, data: newdata });
    } catch (error) {
      console.log(error, "error in pickup post");
      res.status(500).json({ message: "Error in saving pickup data" });
    }
  },
};
