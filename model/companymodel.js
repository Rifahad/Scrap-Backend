const mongoose = require("mongoose");

const agentschema = new mongoose.Schema(
  {
    Companyname: String,
    phone: Number,
    kilogram:Number,
    message: String,
    location:String,
  
    companyImage: String, 
  },
  { timestamps: true }
);

const Company = mongoose.model("company", agentschema);
module.exports = {
  Company
 }
