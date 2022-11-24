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

    User.findOne({_id:decodedData.id})
    .then((udata)=>{
        req.user = udata;
        // console.log(udata);
        next();
    })
    .catch((e)=>{
        req.json({message: "invalid token"})
    })
    // req.user = await User.findById(decodedData._id)

    // next()

})

module.exports.userGuard=(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, "token");
        console.log(data);
        User.findOne({_id:data.userId})
        .then((udata)=>{
            req.userInfo = udata;
            next();
        })
        .catch((e)=>{
            res.json({message: "invalid token"})
        })
    }
    catch(e){
        
        res.json({message:"Invalid token"})
    }
} 

exports.authorizeRoles = (...roles) =>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resource`, 
                    403
                )
            )
            
        }

        next()
    }
}