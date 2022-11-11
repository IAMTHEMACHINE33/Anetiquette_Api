const express = require("express");
const router = new express.Router();
const Category = require("../models/categoryModel");

router.post("/category/add",(req,res)=>{
    const name = req.body.name;

    const data = new Category({
        name: name,
    });
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

module.exports = router;