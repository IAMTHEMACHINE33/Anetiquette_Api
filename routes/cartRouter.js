const express = require("express")
const router = new express.Router();
const Cart = require("../models/cartModel");
const {isAuthenticatedUser} = require("../middleware/auth");

router.post("/cart/add",isAuthenticatedUser,(req,res)=>{
    const user_name = req.user.id;
    const added_product = req.body.added_product;
    if(Cart.findOne({user_name:user_name})){
        const data = new Cart({
            user_name : user_name
        })
        data.save()
    }
    
    Cart.findOneAndUpdate({user_name:user_name},
        {
            $addToSet:{
                products:[
                {
                    added_product:added_product
                }
            ]}
        })
        .then(()=>{
            res.json({success:true,message:"Added to cart"})
        })
        .catch((e)=>{
            res.json({success:false,error:e})
        })
    
    
        
})

router.get("/cart/show",isAuthenticatedUser,(req,res)=>{
    const user_name = req.user.id;
    Cart.findOne({user_name:user_name}).populate('user_name').populate({
        path: "products", 
        populate: {
           path: "added_product" 
        }//asdp
     })
    .then((data)=>{
        res.json({success:true,data:data})
    })
    .catch((e)=>{
        res.json({success:false,error:e})
    })
})

router.put("/cart/remove",isAuthenticatedUser,(req,res)=>{
    const user_name = req.user.id;
    const remove_product= req.body.remove_product
    Cart.findOneAndUpdate({user_name:user_name},
        { $unset: { products: [{
            added_product:remove_product
        }]}})
    .then(()=>{
        res.json({succes:true,message:"removed"})
    })
    .catch((e)=>{
        res.json({success:false,error:e})
    })
})
module.exports = router;