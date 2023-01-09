const express = require("express");
const router = new express.Router();
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const multer = require("multer");
const upload = require("../fileupload/fileupload");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.post("/product/add", isAuthenticatedUser, upload.array("product_img",5),(req,res)=>{

    const product_name = req.body.product_name;
    const price = req.body.price;
    const description = req.body.description;
    // const name = req.files.filename;
    const category = req.body.category;
    const type = req.body.type;
    const last_time = req.body.last_time;
    const user = req.user.id;
    // const last_time = new Date(2022, 12, 15, 17, 30, 0);
    //asdasd
    console.log(req.files[0])
    // console.log(req.files[1].filename)
    const data = new Product({
        product_name: product_name,
        price: price,
        description: description,
        category: category,
        type: type,
        last_time: last_time,
        user:user,
    })
    data.save()
    .then((data)=>{ 
        for(let i =0;i<req.files.length;i++){
            console.log(i)
            Product.findOneAndUpdate({_id:data._id},
                {
                    $addToSet:{images:[{
                        name:req.files[i].filename
                    }]}
                })
                .then()
                .catch()
        }
        res
        .json({msg:"Product Added"})
    }).catch((e)=>{
        res
        .json(e)
    })
})

router.get("/product/show",(req,res)=>{
    Product.find({bought_by:null}).populate('category').populate('bought_by').populate('user')
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
        path: "bid_info", 
        populate: {
           path: "bid_by" 
        }//asd
     })
    .then((data)=>{
        res
            .json({data:data})
            .status(200)
    })//asd
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

    Product.find({bought_by:_id}).populate("category")
    .then((data)=>{
        res.json({success:true,data:data})
            .status(200)
    })
    .catch((e)=>{
        res.json({success:false,error:e})
    })
})

router.get("/product/sell_display",isAuthenticatedUser,(req,res)=>{
    const _id = req.user.id;
    let no;
    Product.find({user:_id,bought_by:no})
    .then((data)=>{
        res.json({success:true,data:data})
    })
    .catch((e)=>{
        re.json({success:false,error:e})
    })
})

router.post("/product/search",(req,res)=>{
    const search = req.body.search;

    Product.find({product_name:search})
    .then((data)=>{
        res.json({success:true,data:data})
            .status(200)
    })
    .catch((e)=>{
        res.json({success:false,error:e})
    })
})



router.post("/product/single/:product_id/bid",isAuthenticatedUser,async (req,res)=>{
    const bid_by = req.user.id
    const bid_price = req.body.bid_price
    
    let b;
      try {
        b =  await Product.findOne({_id:req.params.product_id});
      } catch(err) {
        console.log(err);
      }
    
      
    console.log(b.bid_info.length)
    let old_price= b.price;
    let owner;
    for(let i = 0; i < b.bid_info.length; i++){
        let loop_price = b.bid_info[i].bid_price;
        let loop_owner = b.bid_info[i].bid_by;
        if(old_price < loop_price){
            old_price = loop_price;
            owner = loop_owner;
        }
    }
    var now_time = new Date();
    const last_time= b.last_time;
    // const diff = now_time.getTime()-last_time.getTime()
    // setTimeout(function() {
    //     console.log(diff);
    // }, diff);
    //asd
    console.log("before")
    console.log(last_time.toString()+" last")
    console.log(now_time.toString()+" now")
    if(now_time.getTime()>last_time.getTime()){
        console.log("after")
        console.log(last_time.getTime())
        console.log(now_time.getTime())
        Cart.findOneAndUpdate({user_name:owner},
            {
                $addToSet:{
                    products:[
                    {
                        added_product:added_product
                    }
                ]}
            })
        // Product.findOneAndUpdate({_id:req.params.product_id},{
        //     price: old_price,
        //     bought_by: owner
        // })
        .then(()=>{
            res.json({success:true, msg:"Bidding Over"})
                .status(200)
        })
        .catch((e)=>{
            res.json({success:false, error:e})
        })
    }
    else{
        if(bid_price > old_price){
            Product.findOneAndUpdate({_id:req.params.product_id},
                {$addToSet:{bid_info:[
                    {bid_by:bid_by,
                    bid_price:bid_price}]
                }})
            .then((data)=>{
                res.json({success:true,msg:"added"})
                    .status(200)
                    
            })
            .catch((e)=>{
                res.json({success:false,msg:e})
            })
                
    }else{
        res.json({success:false,msg:"Price is lower or equal than before"})
    }
    }
    
})


  
module.exports = router;
