const mongoose = require("mongoose");

const order = new mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
    },
    address:{
        type:String,
    },
    phone:{
        type:String,
    },
    payment:{
        type:String
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart"
    },
    total:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
    

})

module.exports = mongoose.model("Order",order);