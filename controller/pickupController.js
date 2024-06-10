const { pickupupload } = require("../model/pickup");

module.exports = {
  pickPost: async (req, res) => {
    try {
      const pickupdata = new pickupupload(req.body);
      await pickupdata.save();
      console.log(pickupdata, "data saved");
      res.status(200).json({success:true})
    } catch (error) {
      console.log(error, "error in  pickup post");
    }
  },
  filterdate:async(req,res)=>{
    try{
     console.log(req.body);
     
    }catch(err){

    }
  }
};
