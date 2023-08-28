import mongoose, { connect, Schema, model, mongo } from "mongoose";


//connection string for the Products database
connect("mongodb+srv://atharvanpohnerkar2:atharvan2@webkriti.qyzfxlj.mongodb.net/Products?retryWrites=true&w=majority",{useNewUrlParser:true})
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

//assign headphones variable to the headphones collection
const headphones = model("headphones",productSchema);

// const headphone1 = new Headphone({"title":"Redgear Cosmo 7,1 Usb Gaming Wired Over Ear Headphones With Mic With Virtual Surround Sound,50Mm Driver, Rgb Leds & Remote Control(Black)","price":""," colour":"Black)","discount":"","features":["Redgear Cosmo 7","50Mm Driver"," Rgb Led s & Remote Control(Black)"],"href":"/Redgear-Cosmo-7-1-Headphones-Controller/dp/B079S811J3/ref=sr_1_1?keywords=gaming+headphones&qid=1693218774&sr=8-1","review":" 16,164"});

//find and log all titles of headphones collection
headphones.find().then(function(controllers){
    controllers.forEach(element => {
        console.log(element.title);
    });
})