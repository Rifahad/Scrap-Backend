const { pickupupload } = require("../model/pickup");

module.exports = {
  pickPost: async (req, res) => {
    try {
      const pickupdata = new pickupupload(req.body);
      await pickupdata.save();
      console.log(pickupdata, "data saved");
    } catch (error) {
      console.log(error, "error in  pickup post");
    }
  },
};
