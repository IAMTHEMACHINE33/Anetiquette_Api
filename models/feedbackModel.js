const mongoose = require("mongoose");

const feedback = new mongoose.Schema({
    user_name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    feed:{
        type:String,
    }
})

module.exports = mongoose.model('Feedback',feedback);