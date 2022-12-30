const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Admin = require("../models/adminModel");
const sendToken = require("../utils/jwttoken");

exports.registerAdmin = catchAsyncErrors(async(req, res, next)=>{
    const {name, email, password} = req.body;
    const admin = await Admin.create({
        name, email, password
    })

    const token = admin.getJWTToken();

    sendToken(admin, 201, res)
})

//Login admin
exports.loginAdmin = catchAsyncErrors (async (req, res, next)=>{

    const {email, password} = req.body;

    //checking if admin has given both password and email
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Passowrd", 400));
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if(!admin){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await admin.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(admin, 200, res);
})

exports.show = catchAsyncErrors(async(req, res, next)=>{
    Admin.find()
    .then((data)=>{
        res.json({data:data})
    }).catch((e)=>{
        res.json({error:e})
    })
})
    
exports.logout = catchAsyncErrors(async(req, res, next)=>{
    
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

