import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"; 
import mongoose, { connect, Schema, model, mongo } from "mongoose";
import { productDetails } from "./server.js";

function createToken (user){
    const accessToken = jwt.sign({userName:user.userName,id:user._id},"tokensecret");
    return accessToken;
}

function validateToken (req,res,next){
    const accessToken=req.cookies["token"];
    var validToken
    if(accessToken==null){
        res.json("user not authenticated")
    }
    else{
        try {
            validToken= jwt.verify(accessToken,"tokensecret")
            
            req.user = validToken
            if(validToken){
                req.authenticated=true;
                
                next()
            }
        } catch (error) {
            res.json("error "+error)
        }
    }
    return validToken
}

async function displayCart(userId,Users,carts){
   const itemList=[]
    const id = new mongoose.Types.ObjectId(userId);
    const user = await Users.findById(id);
    const items = await carts.find({userName:user.userName});
    
    for (const item of items[0].productArray) {
        const cartitem = await productDetails(String(item));
        
        itemList.push(cartitem);
    }
 return itemList
}

export { createToken,validateToken,displayCart };