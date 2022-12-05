const express = require("express");
const router = new express.Router();
const Product = require("../models/productModel");
const multer = require("multer");
const upload = require("../fileupload/fileupload");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.post("/product/add", isAuthenticatedUser, upload.single("product_img"),(req,res)=>{

    const product_name = req.body.product_name;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.file.filename;
    const category = req.body.category;
    const type = req.body.type;
    //asdasd
    console.log(product_name);

    const data = new Product({
        product_name: product_name,
        price: price,
        description: description,
        image: image,
        category: category,
        type: type
    })
    data.save()
    .then(()=>{ 
        res
        .json({msg:"Product Added"})
    }).catch((e)=>{
        res
        .json(e)
    })
})

router.get("/product/show",(req,res)=>{
    Product.find().populate('category','bought_by')
    .then((data)=>{
        res.status(203)
        .json({success:true,data:data})
    }).catch((e)=>{
        res.status(403)
        .json({error:e})
    })
})

router.get("/product/single/:product_id",isAuthenticatedUser,(req,res)=>{
    Product.findOne({_id:req.params.product_id}).populate({
        path: "bid_info", // populate blogs
        populate: {
           path: "bid_by" // in blogs, populate comments
        }
     })
    .then((data)=>{
        res.json({data:data})
    })
    .catch((e)=>{
        res.json({error:e})
    })
})

router.put("/product/single/:product_id/bought",isAuthenticatedUser,(req, res)=>{
    const bought_by = req.user.id
    console.log(req.params.product_id)
    Product.updateOne({_id:req.params.product_id},
        {bought_by:bought_by})
    .then((data)=>{
        res
        .json({success:true,msg:"Item Bought"})
    })
    .catch((e)=>{
        res
        .json({success:false,error:e})
    })
})

router.get("/product/purchase_history",isAuthenticatedUser,(req,res)=>{
    const _id = req.user.id;

    Product.find({bought_by:_id})
    .then((data)=>{
        res.json({success:true,data:data})
    })
    .catch((e)=>{
        res.json({success:false,error:e})
    })
})

router.post("/product/search",(req,res)=>{
    const search = req.body.search;

    Product.find({product_name:search})
    .then((data)=>{
        res.json({success:true,data:data})
    })
    .catch((e)=>{
        res.json({success:false,error:e})
    })
})



router.post("/product/single/:product_id/bid",isAuthenticatedUser,async (req,res)=>{
    const bid_by = req.user.id
    const bid_price = req.body.bid_price
    // const a=Product.findOne({_id:req.params.product_id},function old_info(err, data) {
    //     // console.log(temp);
    //     const old_price = data.bid_info[0].bid_price
    //     return old_price;
    //     // console.log(old_price)  
    //   })
    let b;
      try {
        b =  await Product.findOne({_id:req.params.product_id});
      } catch(err) {
        console.log(err);
      }
    
    
    console.log(b.bid_info.length)
    let old_price= b.price;
    for(let i = 0; i < b.bid_info.length; i++){
        let loop_price = b.bid_info[i].bid_price;
        if(old_price < loop_price){
            old_price = loop_price;
        }
    }
    // if(n <= b.bid_info.length){
    //     let loop_price = b.bid_info[n].bid_price;
    //     console.log("loop_price"+loop_price)
    //     n= n+1;
    //     console.log(loop_price)
    //     if(loop_price>old_price){
    //         old_price = loop_price;
    //         console.log(old_price)
    //     }
        
    // }
    // let old_price = b.bid_info[0].bid_price;
    
    // if (b.bid_info == null){
    //     old_price = 
    //     console.log(old_price)
    // } 
    // console.log(old_price);
    // console.log("bid_price"+bid_price)
    // console.log("old_price"+old_price)
    if(bid_price > old_price){
            Product.findOneAndUpdate({_id:req.params.product_id},
                {$addToSet:{bid_info:[
                    {bid_by:bid_by,
                    bid_price:bid_price}]
                }})
            .then((data)=>{
                res.json({success:true,msg:"added"})  
            })
            .catch((e)=>{
                res.json({success:false,msg:e})
            })
                
    }else{
        res.json({success:false,msg:"Price is lower or equal than before"})
    }
})

module.exports = router;
