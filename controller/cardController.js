const { Cardmodel } = require("../model/Carddata");
module.exports = {
  // this path for saving card details on data base
  cardPost: async (req, res, next) => {
    try {
      const body = Object.assign({}, req.body);
      const { title, price } = body;
      const newData = new Cardmodel({
        title,
        price,
        Image: "/assets/cardImages/" + req.file.filename,
      });
      await newData.save();
      res.status(201).json({ success: true, message: "product" });
    } catch (err) {
      next(err);
    }
  },

  // this path is for loop the card in user side
  carddetailspost: async (req, res) => {
    try {
      const carddetails = await Cardmodel.find();
      console.log("----", carddetails);
      res.json({ carddetails });
    } catch (err) {
      console.log(err, "error in card passing to frontend");
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // this path for admin product page looping
  adminCard: async (req, res) => {
    try {
      const adminCard = await Cardmodel.find();
      res.json({ adminCard: adminCard });
    } catch (error) {
      console.log(error, "error in admincard check in card controller");
    }
  },

  // this path for delete admin prodect card
  adminproductdelete: async (req, res) => {
    const id = req.query.id;
    await Cardmodel.deleteOne({ _id: id });
    res.status(200).json({ success: true });
  },
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
  updateProduct: async (req, res) => {
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

      const updatedProduct = await Cardmodel.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
