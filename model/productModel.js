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

});

module.exports = mongoose.model('Product',product);