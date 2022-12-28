const express = require("express");
const { registerUser, loginUser, logout } = require("../controllers/userController");
const multer = require("multer")
const router = express.Router();
const User = require("../models/userModel");
const upload = require("../fileupload/fileupload");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const { default: isEmail } = require("validator/lib/isemail");

router.route("/register").post(upload.none(), registerUser)

router.route("/login").post(loginUser)

router.get("/show",auth.isAuthenticatedUser,(req,res)=>{
    const _id = req.user.id;
    User.findOne({_id:_id})
    .then((data)=>{
        res
        .json({data:data})
        .status(200)
    }).catch((e)=>{
        res.json({error:e})
    })
})

router.put("/update_pic",auth.isAuthenticatedUser,upload.single("user_img"),(req,res)=>{
    const user_img = req.file.filename;
    const user = req.user.id;
    User.findOneAndUpdate({_id:user},
        {
            image:user_img
        })
        .then(()=>{
            res.json({success:true,msg:"Picture added"})
        })
        .catch((e)=>{
            res.json({success:false,error:e})
        })
})

router.put("/update",auth.isAuthenticatedUser,(req,res)=>{
    const _id = req.user.id;
    const{name, email, password} = req.body;
    bcrypt.hash(password, 10, (e, hashed_pw)=>{
        User.updateOne({_id:_id},
            {
                name: name,
                password:hashed_pw,
                email:email
            })
            .then(()=>{
                res.json({message:"Updated",success:true})
            })
            .catch((e)=>{
                res.json({message:e,success:false})
            })
    })
   
})
//asda
router.route("/logout").get(logout)

module.exports = router;