import mongoose, { connect, Schema, model, mongo } from "mongoose";
import express from "express";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { createToken,validateToken,displayCart } from "./jwt.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
var dataFromDatabase;

app.listen(port, () => {
  console.log("Server started port 3000");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("app engine", "ejs");
app.use(express.static("public"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));
app.use(cookieParser());

//connection string for the Products database
mongoose
.connect(
    "mongodb+srv://atharvanpohnerkar2:atharvan2@webkriti.qyzfxlj.mongodb.net/Products?retryWrites=true&w=majority",
    { useNewUrlParser: true },
  )
  .then(() => {
    console.log("db connected");
  });

const productSchema = new Schema({
  title: String,
  price: String,
  rating: Number,
  reviews: String,
  features: {
    feature1: String,
    feature2: String,
    feature3: String,
  },
  discount: String,
  imageURL: String,
});

const userSchema = new Schema({
  userName: String,
  password: String,
  email: String,
});

const cartSchema = new Schema({
  userName: String,
  password: String,
  productArray: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "headphones",
    },
  ],
});

const carts = model("cart", cartSchema);
const Users = model("user", userSchema);

//find and log all data of particular collection
async function displayItems(search) {
  const array = [];
  var search = model(search, productSchema);
  await search.find().then((items) => {
    items.forEach((element) => {
      array.push(element);
    });
  });
  return array;
}

//find a particular product from database using its _id
async function productDetails(productId) {
  const models = [
    "headphones",
    "chairs",
    "controllers",
    "laptops",
    "mice",
    "monitors",
    "coolingpad"
  ];
  const id1 = new mongoose.Types.ObjectId(productId);
  var item;
  for (let index = 0; index < 7; index++) {
    var search = model(models[index], productSchema);
    item = await search.findById(id1);
    if (item) {
      return item; // Return the item if found
    }
  }
  return null;
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/data', (req, res) => {
  if (dataFromDatabase) {
    res.json(dataFromDatabase);
  } else {
    console.log('dataFromDatabase is empty or undefined');
    res.json(null); // You can send an empty JSON object or an appropriate response when dataFromDatabase is empty
  }   
});

app.get("/shop/:id", async (req, res) => {
    try{ const category = req.params.id
        const array = await displayItems(category); 
        dataFromDatabase= array;
        res.sendFile(path.join(__dirname, 'views', 'shop-page.html'));}
        catch(err){
            console.log(err)
        }
})

app.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const product = await productDetails(id);
  
  dataFromDatabase= product;
    res.sendFile(path.join(__dirname, 'views', 'product-page.html'));
  
});

app.get("/register", async (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get("/login", async (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


app.post("/register", async (req, res) => {
  console.log(req.body);
  var hashed;
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    const user = await Users.findOne({ userName: userName, email: email });
    if (user !== null) {
        dataFromDatabase = "User exists, try logging in";
        res.sendFile(path.join(__dirname, 'views', 'register.html'));
    //   res.render("register.html", { message: "User exists, try logging in" });
    } else {
      await bcrypt.hash(password, 10).then((hash) => {
        hashed = hash;
      });
      carts.create({
        userName: userName,
        password: hashed,
        productArray: null,
      });
      Users.create({ userName: userName, password: hashed, email: email }).then(
        (createdUser) => {
          const accessToken = createToken(createdUser); // Create token with the created user
          console.log(accessToken);
          res.cookie("token", accessToken, {
            maxAge: 60 * 60 * 24 * 1000,
          });
        },
      );
       dataFromDatabase = "Successfully registered";
      res.sendFile(path.join(__dirname, 'views', 'register.html'));
     
    }
  } catch (error) {
    dataFromDatabase = "register failed" + error ;
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
  }
});

//used for logging in an user
app.post("/login", async (req, res) => {
  console.log(req.body);
  var hashed;
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    const user = await Users.findOne({ userName: userName, email: email });
    console.log(user);
    if (user._id !== null) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else if (result) {
          const accessToken = createToken(user);
          console.log(accessToken);
          res.cookie("token", accessToken, {
            maxAge: 60 * 60 * 24 * 1000,
          });
          dataFromDatabase = "User successfully logged in" ;
         res.sendFile(path.join(__dirname, 'views', 'login.html'));
        } else {
            dataFromDatabase = "Incorrect password" ;
         res.sendFile(path.join(__dirname, 'views', 'login.html'));
        }
      });
      
    } else {
        dataFromDatabase ="User not found Plz sign up" ;
      res.sendFile(path.join(__dirname, 'views', 'login.html'));
    }
  } catch (error) {
    dataFromDatabase = "Login error : " + error;
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
  }
});

// used to add items to cart by getting their id
app.put("/cart/:id", validateToken, async (req, res) => {
  const userId = req.user.id;
  console.log(req.params.id);
  const Uid = new mongoose.Types.ObjectId(userId);
  var id = req.params.id;
  const itemArray = [];

  try {
    const user = await Users.findById(Uid);
    await carts
      .updateOne({ userName: user.userName }, { $push: { productArray: id } })
      .then(res.status(200));
    await carts.find().then((items) => {
      items.forEach((item) => {
        itemArray.push(item.productArray);
      });
    });
    console.log(itemArray);
    dataFromDatabase = itemArray;
    res.sendFile(path.join(__dirname, 'views', 'view-cart.html'));
  } catch (error) {
    console.log("error" + error);
  }
});

// used to delete items from cart by using their id
app.delete("/cart/:id", validateToken, async (req, res) => {
  const userId = req.user.id;
  console.log(req.params.id);
  const Uid = new mongoose.Types.ObjectId(userId);
  var id = req.params.id;
  var pid = new mongoose.Types.ObjectId(id);

  try {
    const user = await Users.findById(Uid);
    await carts
      .updateOne({ userName: user.userName }, { $pull: { productArray: pid } })
      .then(res.status(200));
    const itemList = await displayCart(userId, Users, carts);
    console.log(itemList);
    dataFromDatabase = itemList;
    res.sendFile(path.join(__dirname, 'views', 'view-cart.html'));
  } catch (error) {
    console.log("error" + error);
  }
});

//used for getting cart of a logged in user
app.get("/cart", validateToken, async (req, res) => {
  const userId = req.user.id;
  const itemList = await displayCart(userId, Users, carts);
  console.log(itemList);
  dataFromDatabase = itemList;
  console.log(req.user.userName)
    res.sendFile(path.join(__dirname, 'views', 'view-cart.html'));
});

export { productDetails };
