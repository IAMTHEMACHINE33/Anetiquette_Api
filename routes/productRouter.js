const express = require("express");
const router = new express.Router();
const Product = require("../models/productModel");
const multer = require("multer");
const upload = require("../fileupload/fileupload");

router.post("/product/add",upload.single("product_img"),(req,res)=>{
    const price = req.body.price;
    const description = req.body.description;
    const image = req.file.filename;

    const data = new Product({
        price: price,
        description: description,
        image: image
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

module.exports = router;
