const mongoose = require("mongoose");

const product = new mongoose.Schema({
    price:{
        type: Number,
    },
    product_name:{
        type: String
    },
    type:{
        type: String
    },
    dead_time:{
        type: Date
    },
    bought_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    bid_info:[{
        bid_by:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"},
        bid_price:{type: Number}
    }],
    add_time:{
        type: Date,
        default: Date.now    
    },
    last_time:{
        type: Date,
    },
    description:{
        type: String,
    },
    images:[{
        name:{
            type:String
        }
    }],
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

});

module.exports = mongoose.model('Product',product);