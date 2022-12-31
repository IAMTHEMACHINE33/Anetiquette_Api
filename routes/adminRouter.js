const express = require("express");
const {registerAdmin, loginAdmin, logout, show} = require('../controllers/adminController');
const Admin = require("../models/adminModel");
const multer = require("multer");
const { isAuthenticatedAdmin } = require("../middleware/auth");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const router = new express.Router();
const upload = multer();

router.route("/register_admin").post(upload.none(), registerAdmin)

router.route("/login_admin").post(loginAdmin)

router.route("/show_admin").get(show)

router.route("/logout").get(logout)

router.get("/dash",isAuthenticatedAdmin,async(req,res)=>{
    let user;
    let product;
    let order;
    let admin;
    try{
         user = await User.find();
         product = await Product.find().populate('category');
         order = await Order.find();
         admin = await Admin.findOne({_id:req.admin.id})
    }
    catch{
        console.log("error")
    }
    let total_user;  
    let total_product;
    let total_order;
    var total_revenue = 0;
    total_user = user.length;
    total_product =  product.length;
    total_order = order.length;
    for(let i=0;i<total_order;i++){
        total_revenue = parseInt(order[i].total) + total_revenue;
    }
    const data={
        total_user:total_user,
        total_product:total_product,
        total_order:total_order,
        total_revenue:total_revenue}
    res.json({data:data,product:product,user:user,admin:admin})
        .status(200)

})

router.get("/customers",isAuthenticatedAdmin,(req,res)=>{
    User.find()
    .then((data)=>{
        res.json({success:true,data:data})
            .status(200)
    })
    .catch((e)=>{
        res.json({success:false,error:e})
    })
})

router.get("/products",isAuthenticatedAdmin,(req,res)=>{
    Product.find().populate("category")
    .then((data)=>{
        res.json({success:true,data:data})
            .status(200)
    })
    .catch((e)=>{
        res.json({success:false,error:e})
    })
})

router.get("/orders",isAuthenticatedAdmin,(req,res)=>{
    Order.find()
    .then((data)=>{
        res.json({success:true,data:data})
            .status(200)
    })
    .catch((e)=>{
        res.json({success:false,error:e})
    })
})
module.exports = router;
