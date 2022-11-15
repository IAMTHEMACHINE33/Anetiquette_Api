const express = require("express");
const router = new express.Router();
const Product = require("../models/productModel");
const multer = require("multer");
const upload = require("../fileupload/fileupload");

router.post("/product/add",upload.single("product_img"),(req,res)=>{
    const product_name = req.body.product_name;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.file.filename;
    const category = req.body.category;
    //asdasd

    const data = new Product({
        product_name: product_name,
        price: price,
        description: description,
        image: image,
        category: category,
    })
    data.save()
    .then(()=>{
        res
        .status(201)
        .json({msg:"Product Added"})
    }).catch((e)=>{
        res
        .status(401)
        .json(e)
    })
})

router.get("/product/show",(req,res)=>{
    Product.find().populate('category')
    .then((data)=>{
        res.status(203)
        .json({success:true,data:data})
    }).catch((e)=>{
        res.status(403)
        .json({error:e})
    })
})

module.exports = router;
