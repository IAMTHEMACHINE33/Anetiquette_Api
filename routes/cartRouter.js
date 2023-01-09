const express = require("express")
const router = new express.Router();
const Cart = require("../models/cartModel");
const {isAuthenticatedUser} = require("../middleware/auth");

router.post("/cart/add",isAuthenticatedUser,async (req,res)=>{
    const user_name = req.user.id;
    const added_product = req.body.added_product;

    let c;
    
    try{
        c = await Cart.findOne({user_name:user_name});
        
    }catch(e){
        console.log(e);
    }
    if(c == null){
        let repeat_product;
    }
    else{
        for(let i=0; i<c.products.length; i++){
            let loop_product=c.products[i].added_product;
            if(added_product == loop_product){
                var repeat_product=loop_product;
            }
        }
    }
    
    
    if(repeat_product == null){
        Cart.findOneAndUpdate({user_name:user_name},
            {
                $addToSet:{
                    products:[
                    {
                        added_product:added_product
                    }
                ]}
            },{ upsert: true, new: true })
            .then(()=>{
                res
                .json({success:true,message:"Added to cart"})
                .status(201)
            })
            .catch((e)=>{
                res.json({success:false,error:e})
            })   
    }
    else{
        res.json({success:true,msg:"already exists"})
    }
    
  
    
            
        
    
        
    
      
})

router.get("/cart/show",isAuthenticatedUser,(req,res)=>{
    const user_name = req.user.id;
    Cart.findOne({user_name:user_name}).populate('user_name').populate({
        path: "products", 
        populate: {
           path: "added_product" 
        }//asdp
     }).populate({
        path: "products", 
        populate: {
           path: "added_product",
           populate:{
            path: "category"
           }
        }//asdp
     })
    .then((data)=>{
        res
        .json({success:true,data:data})
        .status(200)
        
    })
    .catch((e)=>{
        res.json({success:false,error:e})
    })
})

router.put("/cart/remove",isAuthenticatedUser,(req,res)=>{
    const user_name = req.user.id;
    const remove_product= req.body.remove_product
    Cart.findOneAndUpdate({user_name:user_name},{
         $pull: { products: {
            added_product:remove_product
         } }//asdasdsa 
    })
    .then(()=>{
        res.json({success:true,msg:"removed"})
    })
    .catch((e)=>{
        res.json({success:false,error:e})
    })
})
module.exports = router;