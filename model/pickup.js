const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema({
  full_name: String,
  phone: Number,
  address: String,
  city: String,
  country: String,
  state: String,
  zipcode: String,
  pickupImage: String,
}, { timestamps: true });

const pickupupload = mongoose.model("pickupschema", pickupSchema);

module.exports = {
    pickupupload
  }
