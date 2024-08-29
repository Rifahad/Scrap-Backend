const { pickupupload } = require("../model/pickup");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
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
  user: async (req, res, next) => {
    try {
      const userData = await pickupupload.find();
      const cardsWithUrls = await Promise.all(
        userData.map(async (card) => {
          const getObjectParams = {
            Bucket: bucketName,
            Key: card.pickupImage,
          };
          const url = await getSignedUrl(s3, new GetObjectCommand(getObjectParams), { expiresIn: 3600 });
          return { ...card.toObject(), Url: url };
        })
      );
      res.status(200).json({ userData: cardsWithUrls });
    } catch (error) {
      next(error);
    }
  },

  userdelete: async (req, res, next) => {
    try {
      const id = req.query.id;

      // Find the document to get the image key
      const record = await pickupupload.findById(id);
      if (!record) {
        return res.status(404).json({ success: false, message: "Record not found" });
      }

      // Delete the image from S3
      const deleteObjectParams = {
        Bucket: bucketName,
        Key: record.pickupImage,
      };
      await s3.send(new DeleteObjectCommand(deleteObjectParams));

      // Delete the document from the database
      await pickupupload.deleteOne({ _id: id });
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  },
};
