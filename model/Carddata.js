const mongoose = require('mongoose')

const card = new mongoose.Schema({
    Image:{
        type:String},
    title:{
        type:String
    },
    price:{
        type:String
    },

})

const Cardmodel =mongoose.model('cardschema',card)

module.exports={
    Cardmodel
}