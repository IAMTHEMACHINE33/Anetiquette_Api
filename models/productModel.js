const mongoose = require("mongoose");

const product = new mongoose.Schema({
    price:{
        type: Number,
    },
    product_name:{
        type: String
    },
    bought_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date:{
        type: Date,
        default: Date.now    
    },
    description:{
        type: String,
    },
    image:{
        type: String,
    },
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