const express = require("express");
const reload = require("reload");

const app = express();

app.set("app engine", "ejs");
app.use(express.static("public"));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.get("/product", (req, res) => {
  res.render("product.ejs");
});
app.get("/shop", (req, res) => {
  res.render("shop-page.ejs");
});
app.get("/cart", (req, res) => {
  res.render("view-cart.ejs");
});

app.listen(3000);

reload(app);
// const searchItem = "headphone";
// app.get("/",async()=>{
//
//     const options ={
//     method: "GET",
//     url: "https://www.amazon.in/s?k="+searchItem,
//     headers: {
//     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
//     }};
//
//     const axiosResponse = await axios.request(options);
//     const $ = cheerio.load(axiosResponse.data);
//     const price =$("span.a-offscreen").text();
//     const title =$("h2.a-size-mini").text();
//     const rating = $("span.puis-normal-weight-text").text();
//     // const reviewsNum = $("span.a-size-base.s-underline-text").text();
//     // console.log(reviewsNum);
//     const priceArray = price.split("₹");
//     const titleArray = title.split("  ");
//     const ratingArray =[];
//     var c=0;
//
//     // seperate ratings one by one into array
//     for (let index = 0; index < rating.length; index++) {
//       if(index%3==0){
//         ratingArray[c]=rating.substring(index,index+3);
//         c++;
//       }
//     }
//
//
//
// });
//
