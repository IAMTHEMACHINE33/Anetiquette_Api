const mongoose = require("mongoose");

const product = new mongoose.Schema({
    price:{
        type: Number,
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
        red: "Category"
    }

});

module.exports = mongoose.model('Product',product);