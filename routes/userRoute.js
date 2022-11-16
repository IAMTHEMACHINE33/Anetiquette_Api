const express = require("express");
const { registerUser, loginUser, logout } = require("../controllers/userController");
const multer = require("multer")
const router = express.Router();
const User = require("../models/userModel");
const upload = multer();

router.route("/register").post(upload.none(), registerUser)

router.route("/login").post(loginUser)

router.get("/show",(req,res)=>{
    User.find()
    .then((data)=>{
        res.json({data:data})
    }).catch((e)=>{
        res.json({error:e})
    })
})

router.route("/logout").get(logout)

module.exports = router;