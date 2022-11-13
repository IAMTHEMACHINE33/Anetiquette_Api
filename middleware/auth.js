const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("./catchAsyncErrors")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

exports.isAuthenticatedUser = catchAsyncErrors( async(req, res, next)=>{
    const { token } = req.cookies

    if(!token){
        return next(new ErrorHandler("Please login to access this resoruce", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedData._id)

    next()

})