const mongoose = require("mongoose");

const category = new mongoose.Schema({
    name:{
        type:String
    }
})

module.exports = mongoose.model('Category',category);