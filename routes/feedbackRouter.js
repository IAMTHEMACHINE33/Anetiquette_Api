const express = require("express");
const router = new express.Router();
const Feedback = require("../models/feedbackModel");
const {isAuthenticatedUser} = require("../middleware/auth");

router.post("/feedback/add",isAuthenticatedUser,(req,res)=>{
    const user_name = req.user.id;
    const feed = req.body.feed;
    const data=new Feedback({
        user_name:user_name,
        feed:feed
    });
    data.save()
    .then(()=>{
        res.json({success:true,msg:"feedback added"})
            .status(200)
    })
    .catch((e)=>{
        res.json({success:false,error:e})
    })
})

router.get("/feedback/show",isAuthenticatedUser,(req,res)=>{
    Feedback.find().populate("user_name")
    .then((data)=>{
        res.json({success:true,data:data})
            .status(200)
    })
    .catch((e)=>{
        res.json({success:false,error:e})
    })
})

module.exports = router;