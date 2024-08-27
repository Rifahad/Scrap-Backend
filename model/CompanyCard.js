const mongoose = require('mongoose')

const card = new mongoose.Schema({
    Image:{
        type:String
    },
    title:{
        type:String
    },
    price:{
        type:String
    },

})

const CompanycardModel =mongoose.model('Companycardschema',card)

module.exports={
    CompanycardModel
}