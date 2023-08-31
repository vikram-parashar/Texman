import mongoose, { connect, Schema, model, mongo } from "mongoose";
import express from "express";
import axios from "axios";
import * as cheerio from 'cheerio';
import bcrypt from "bcrypt"
import bodyParser from "body-parser";

const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port,()=>{
    console.log("Server started port 4000");
});

//connection string for the Products database
mongoose.connect("mongodb+srv://atharvanpohnerkar2:atharvan2@webkriti.qyzfxlj.mongodb.net/Products?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>{
    console.log("db connected");
})

const productSchema = new Schema({
    title:String,
    price:Number,
    rating:Number,
    reviews:String,
    features:
        {feature1:String,
        feature2:String,
        feature3:String,},
    discount:String,
    imageURL:String
})

const userSchema = new Schema({
    userName:String,
    password:String,
    email:String
})

const Users = model("user",userSchema);
//assign headphones variable to the headphones collection
// const headphones = model("headphones",productSchema);

// const headphone1 = new Headphone({"title":"Redgear Cosmo 7,1 Usb Gaming Wired Over Ear Headphones With Mic With Virtual Surround Sound,50Mm Driver, Rgb Leds & Remote Control(Black)","price":""," colour":"Black)","discount":"","features":["Redgear Cosmo 7","50Mm Driver"," Rgb Led s & Remote Control(Black)"],"href":"/Redgear-Cosmo-7-1-Headphones-Controller/dp/B079S811J3/ref=sr_1_1?keywords=gaming+headphones&qid=1693218774&sr=8-1","review":" 16,164"});
Users.find().then((users)=>{
    users.forEach((user)=>{
        console.log(user)
    })
})


//find and log all data of particular collection
async function displayItems(search){
    const array=[]
    var search = model(search ,productSchema);
    await search.find().then((items)=>{
        items.forEach(element => {
        array.push(element)
        });
    })
    return array
}

//find a particular product from database using its _id
async function productDetails(productId){
    const models = ["headphones", "chairs", "controllers","laptops","mice","monitors"];
    var item;
    for (let index = 0; index ==0; index++) {
    var search = model(models[index] ,productSchema);
    await search.find().then((items)=>{
        items.forEach(element => {
    
        if(String(element._id)==String(productId)){
             item = element
        }
        });
    })
    }
    return item
}

app.get("/",(req,res)=>{
    res.render('home.ejs')
})

app.get("/product",async(req,res)=>{
    const category = req.body.type
    const array = await displayItems(category);  //change headphones to any category within database
    res.render('index.ejs',{content:array})
})

app.get("/product/:id",async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const product = await productDetails((id));
    console.log(product)
    res.render('index.ejs',{content:product});
})

app.get("/register",async(req,res)=>{
    res.render('register.ejs')
})
app.get("/login",async(req,res)=>{
    res.render('login.ejs')
})
app.get("/cart",async(req,res)=>{
    
})

app.post("/register",async(req,res)=>{
    console.log(req.body)
    var hashed;
        try {
            const userName = req.body.userName
            const password = req.body.password
            const email = req.body.email
            const user =  Users.findOne({ userName: userName ,email:email});
            if(user){
                res.render('register.ejs',{message:"User exists, try logging in"});
            }
            else{
                bcrypt.hash(password,10).then((hash)=>{
                hashed=hash;})
                Users.create({userName:userName,password:hashed,email:email});
                res.render('register.ejs',{message:"register success"});
            }
            
        } 
        catch (error) {
            res.render('register.ejs',{message:"register failed"+error});
        }
    
});

app.post("/login",async(req,res)=>{
    console.log(req.body)
    var hashed;
    try {
        const userName = req.body.userName
        const password = req.body.password
        const email = req.body.email
        const user =  Users.findOne({ userName: userName });
        if(user){
            bcrypt.hash(password,10).then((hash)=>{
                hashed=hash;
            })
            if(hashed==user.password)
            {
                res.render('login.ejs',{message:"User successfully logged in"});
            }
            else{
                res.render('login.ejs',{message:"Login failed"});
            }
        }
    }catch(error){
        res.render('login.ejs',{message:"Login error : "+error});
    }
});
