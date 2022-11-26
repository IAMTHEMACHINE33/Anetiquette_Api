const express = require("express");
const router = new express.Router();
const Category = require("../models/categoryModel");
const multer = require("multer");
const upload = require("../fileupload/fileupload");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router.post("/category/add",isAuthenticatedUser, upload.single("category_img"),(req,res)=>{
    const name = req.body.name;
    const image = req.file.filename;

    const data = new Category({
        name: name,
        image: image

    })
    data.save()
    .then(()=>{
        res
        .status(202)
        .json({msg:"Category Added"})

    }).catch((e)=>{
        res
        .status(402)
        .json({e})
    })
})

router.get("/category/show",(req,res)=>{
    Category.find()
    .then((data)=>{
        res
        .json({success:true,data:data})
        
    }).catch((e)=>{
        res.status(404)
        .json({error:e})
    })
})

module.exports = router;