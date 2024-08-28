const { Cardmodel } = require("../model/Carddata");
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
  // Save card details in the database
  cardPost: async (req, res, next) => {
    try {
      const imageName = randomImage();
      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      await s3.send(new PutObjectCommand(params));
      
      const { title, price } = req.body;
      const newData = new Cardmodel({ title, price, Image: imageName });
      await newData.save();

      res.status(201).json({ success: true, message: "Product added successfully" });
    } catch (err) {
      next(err);
    }
  },

  // Retrieve and return card details with signed image URLs
  carddetailspost: async (req, res) => {
    try {
      const cardDetails = await Cardmodel.find();
      const cardsWithUrls = await Promise.all(
        cardDetails.map(async (card) => {
          const getObjectParams = {
            Bucket: bucketName,
            Key: card.Image,
          };
          const url = await getSignedUrl(s3, new GetObjectCommand(getObjectParams), { expiresIn: 3600 });
          return { ...card.toObject(), Url: url };
        })
      );
      res.json({ carddetails: cardsWithUrls });
    } catch (err) {
      console.error("Error retrieving card details:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Retrieve and return admin cards with signed image URLs
  adminCard: async (req, res) => {
    try {
      const adminCards = await Cardmodel.find();
      const cardsWithUrls = await Promise.all(
        adminCards.map(async (card) => {
          const getObjectParams = {
            Bucket: bucketName,
            Key: card.Image,
          };
          const url = await getSignedUrl(s3, new GetObjectCommand(getObjectParams), { expiresIn: 3600 });
          return { ...card.toObject(), Url: url };
        })
      );
      res.json({ adminCard: cardsWithUrls });
    } catch (error) {
      console.error("Error retrieving admin cards:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Delete a product and its image from S3
  adminproductdelete: async (req, res) => {
    try {
      const id = req.query.id;
      const product = await Cardmodel.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const deleteParams = {
        Bucket: bucketName,
        Key: product.Image,
      };
      await s3.send(new DeleteObjectCommand(deleteParams));
      await Cardmodel.deleteOne({ _id: id });

      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Retrieve product details for editing
  adminproductedit: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Cardmodel.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update product details
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, price } = req.body;
      const updatedData = { title, price };

      if (req.file) {
        updatedData.Image = randomImage(); // Replace image if new file is provided
        const params = {
          Bucket: bucketName,
          Key: updatedData.Image,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        };
        await s3.send(new PutObjectCommand(params));
      }

      const updatedProduct = await Cardmodel.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
