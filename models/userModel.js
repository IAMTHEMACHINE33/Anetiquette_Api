const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [50,"Name too long"],
        minLength:[4, "Name too short"]
    },
    email:{
        type: String,
        required: [true, "Please Enter your Email"],
        unique: true,
        validate:[validator.isEmail, "Please Enter a Valid Email"]
    },
    password:{
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [4, "Password too short"],
        select: false,
    },
    image:{
        type:String,
    },
    avatar:{
        public_id:{
            type: String
        },
        url: {
            type: String
        }
    },

    role:{
        type: String,
        default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})


// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", userSchema)
