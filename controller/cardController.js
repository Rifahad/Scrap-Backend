const { Cardmodel } = require("../model/Carddata");
// admin card
module.exports = {


  // this path for saving card details on data base 
  cardPost: async (req, res,next) => {
    try{
    const body = Object.assign({}, req.body);
    const { title, price } = body;
    const newData = new Cardmodel({
      title,
      price,
      Image : '/assets/cardImages/' + req.file.filename,
    });
    await newData.save();
    res.status(201).json({ success: true, message: "product" });
}catch(err){
   next(err)
}
  },

  // this path is for loop the card

  carddetailspost: async (req, res) => {
      try {
          console.log('triggered');
          const carddetails = await Cardmodel.find();
          console.log("----",carddetails);
          res.json({ carddetails });
      } catch (err) {
          console.log(err, 'error in card passing to frontend');
          res.status(500).json({ error: 'Internal Server Error' });
      }
  },



// this path for admin product page looping 

adminCard:async(req,res)=>{
try {
  const adminCard = await Cardmodel.find()
res.json({adminCard:adminCard})
} catch (error) {
  console.log(error,'error in admincard check in card controller');
}

}

};
