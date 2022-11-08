const express = require("express");
const router = new express.Router();
const Product = require("../model/productModel");

router.post("/product/add",(req,res)=>{
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.image;

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
