const { Company } = require("../model/companymodel");
const { CompanycardModel } = require("../model/CompanyCard");

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
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
  agenyformPost: async (req, res) => {
    try {
      const { companyName, phone, location, tonAmount, message } = req.body;
      const company = new Company({
        Companyname: companyName,
        phone: phone,
        location: location,
        kilogram: tonAmount,
        message: message,
      });
      await company.save();
      res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  agentdata: async (req, res) => {
    try {
      const agentData = await Company.find();
      res.status(200).json({ message: true, Agent: agentData });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  agentCard: async (req, res) => {
    try {
      const imageName = randomImage();
      console.log(req.file);

      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      await s3.send(new PutObjectCommand(params));

      const { title, price } = req.body;
      const newData = new CompanycardModel({
        title,
        price,
        Image: imageName,
      });
      await newData.save();
      res
        .status(201)
        .json({ success: true, message: "Product added successfully" });
    } catch (err) {
      console.log(
        err,
        "Error in agentCard function in the agentCard controller"
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  agentcarddata: async (req, res) => {
    try {
      const agentData = await CompanycardModel.find();
      const agentDataWithUrls = await Promise.all(
        agentData.map(async (agent) => {
          const getObjectParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: agent.Image,
          };

          const imageUrl = await getSignedUrl(
            s3,
            new GetObjectCommand(getObjectParams),
            {
              expiresIn: 3600,
            }
          );
          return { ...agent.toObject(), Url: imageUrl };
        })
      );
      res.status(200).json({ success: true, Agent: agentDataWithUrls });
    } catch (err) {
      console.log(
        err,
        "Error in passing agent data to frontend, please check the company controller agent card data"
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  ExistingAgent: async (req, res) => {
    try {
      const { number } = req.body;
      const Num = number;
      const Exist = await Company.findOne({ phone: Num });

      if (Exist) {
        res.status(200).json({ message: "Number exists", company: Exist });
      } else {
        res.status(202).json({ message: "render agentform" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  agentcardGet: async (req, res) => {
    try {
      const data = await CompanycardModel.find();
      const dataWithUrls = await Promise.all(
        data.map(async (agent) => {
          const getObjectParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: agent.Image,
          };

          const imageUrl = await getSignedUrl(
            s3,
            new GetObjectCommand(getObjectParams),
            { expiresIn: 3600 }
          );

          return { ...agent.toObject(), Url: imageUrl };
        })
      );

      res.status(200).json({ message: true, Agent: dataWithUrls });
    } catch (error) {
      console.error("Error in agent card get:", error);
      res.status(400).json({ message: "Page not found" });
    }
  },

  agentproductdelete: async (req, res) => {
    try {
      const Id = req.query.id;
      const product = await CompanycardModel.findById(Id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const deleteObjectParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: product.Image,
      };

      await s3.send(new DeleteObjectCommand(deleteObjectParams));
      await CompanycardModel.findByIdAndDelete(Id);
      res.status(200).json({ message: true });
    } catch (err) {
      console.log(
        err,
        "Error in agent product card delete, please check the company controller"
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  adminAgentproductEdit: async (req, res) => {
    try {
      3310;
      const { id } = req.params;
      const product = await CompanycardModel.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  AgentupdateProduct: async (req, res) => {
    const { id } = req.params;
    const { title, price } = req.body;

    try {
      const updatedData = {
        title,
        price,
      };

      if (req.file) {
        updatedData.Image = "/assets/cardImages/" + req.file.filename;
      }

      const updatedProduct = await Cardmodel.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
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

  agentproductDelete: async (req, res) => {
    try {
      const id = req.query.id;
      await Company.deleteOne({ _id: id });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error, "erron in agent product delete");
    }
  },
};
