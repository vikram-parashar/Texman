const express = require('express')
const app = express()
const reload = require('reload')

app.set('app engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(3000)

app.get('/product', (req, res) => {
    res.render('product.ejs')
})

reload(app)
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
