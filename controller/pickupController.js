const { pickupupload } = require("../model/pickup");
module.exports = {
  pickPost: async (req, res) => {
    try {
      console.log(req.body,'got it');
      req.body.pickupImage = req.file.filename;
      const newdata = new pickupupload(req.body)
      await newdata.save()
      console.log(newdata)
      res.status(200).json({message:true})
    } catch (error) {
      console.log(error, "error in  pickup post");
    }
  },
};
