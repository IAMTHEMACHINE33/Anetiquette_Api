const mongoose = require("mongoose")

const cart = new mongoose.Schema({
    user_name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    products:[{
        added_product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    }]
})

module.exports = mongoose.model('Cart',cart);