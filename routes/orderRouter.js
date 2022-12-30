const express = require("express");
const router = new express.Router();
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const {isAuthenticatedUser}=require("../middleware/auth");

router.post("/order/add",isAuthenticatedUser,async (req,res)=>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.lastname;
    const address = req.body.address;
    const phone = req.body.phone;
    const payment = req.body.payment;
    const total = req.body.total;
    const cart = req.body.cart;
    const user =req.user.id

    const data = new Order({
        firstname:firstname,
        lastname:lastname,
        email:email,
        address:address,
        phone:phone,
        payment:payment,
        total:total,
        cart:cart,
        user:user,
    })
    data.save()
    let a;
    try{
        a = await Cart.findOne({_id:cart})
    }
    catch(e){
        console.log(e)
    }
    for(let i=0;i < a.products.length;i++){
        // console.log(a.products[i].added_product)
        Product.findOneAndUpdate({_id:a.products[i].added_product},
                {
                    bought_by:req.user.id
                }).then()
                .catch()
    }
    Cart.findOneAndRemove({user_name:user})
    .then(()=>{
        res
        .status(200)
        .json({success:true,msg:"done"})
        
    })
    .catch((e)=>{
        res
        .json({success:false,error:e})
        .status(500)
    })
    
})

router.get("/order/show",isAuthenticatedUser,(req,res)=>{
    const user=req.user.id;
    Order.find({user:user}).populate('cart')
    .then((data)=>{
        res
        .json({success:true,data:data})
        .status(200)
    })
    .catch((e)=>{
        res.json({success:false,error:e})
    })
})



module.exports = router;