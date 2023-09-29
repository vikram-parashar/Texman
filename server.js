import mongoose, { connect, Schema, model, mongo } from "mongoose";
import express from "express";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { createToken, validateToken, displayCart } from "./jwt.js";
import path from "path";
import { fileURLToPath } from "url";
import reload from "reload";

const app = express();
const port = 3000;

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
  price: Number,
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
// const headphones = model("headphones",productSchema);

// const headphone1 = new Headphone({"title":"Redgear Cosmo 7,1 Usb Gaming Wired Over Ear Headphones With Mic With Virtual Surround Sound,50Mm Driver, Rgb Leds & Remote Control(Black)","price":""," colour":"Black)","discount":"","features":["Redgear Cosmo 7","50Mm Driver"," Rgb Led s & Remote Control(Black)"],"href":"/Redgear-Cosmo-7-1-Headphones-Controller/dp/B079S811J3/ref=sr_1_1?keywords=gaming+headphones&qid=1693218774&sr=8-1","review":" 16,164"});

// Users.find().then((users) => {
//     users.forEach((user) => {
//         console.log(user)
//     })
// })

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
  ];
  const id1 = new mongoose.Types.ObjectId(productId);
  var item;
  for (let index = 0; index < 6; index++) {
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

app.get("/shop", async (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'shop-page.html'));
});

// app.get("/shop/:id", async (req, res) => {
//   const category = req.params.id;
//   const array = await displayItems(category);
//   console.log(array[0]); //change headphones to any category within database
//   res.render("shop-page.ejs", { content: array });
// });

app.get("/product/zebbang", async (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'product-page.html'));
});

// app.get("/product/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   const product = await productDetails(id);
//   console.log(product);
//   res.render("product.ejs", { content: product });
// });

app.get("/register", async (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get("/login", async (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

//used for registering an user
// app.post("/register", async (req, res) => {
//   console.log(req.body);
//   var hashed;
//   try {
//     const userName = req.body.userName;
//     const password = req.body.password;
//     const email = req.body.email;
//     const user = await Users.findOne({ userName: userName, email: email });
//     if (user !== null) {
//       res.render("register.ejs", { message: "User exists, try logging in" });
//     } else {
//       await bcrypt.hash(password, 10).then((hash) => {
//         hashed = hash;
//       });
//       carts.create({
//         userName: userName,
//         password: hashed,
//         productArray: null,
//       });
//       Users.create({ userName: userName, password: hashed, email: email }).then(
//         (createdUser) => {
//           const accessToken = createToken(createdUser); // Create token with the created user
//           console.log(accessToken);
//           res.cookie("token", accessToken, {
//             maxAge: 60 * 60 * 24 * 1000,
//           });
//         },
//       );
//
//       res.render("register.ejs", { message: "register success" });
//     }
//   } catch (error) {
//     res.render("register.ejs", { message: "register failed" + error });
//   }
// });

//used for logging in an user
// app.post("/login", async (req, res) => {
//   console.log(req.body);
//   var hashed;
//   try {
//     const userName = req.body.userName;
//     const password = req.body.password;
//     const email = req.body.email;
//     const user = await Users.findOne({ userName: userName, email: email });
//     console.log(user);
//     if (user._id !== null) {
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (err) {
//           console.error("Error comparing passwords:", err);
//         } else if (result) {
//           const accessToken = createToken(user);
//           console.log(accessToken);
//           res.cookie("token", accessToken, {
//             maxAge: 60 * 60 * 24 * 1000,
//           });
//
//           res.render("login.ejs", { message: "User successfully logged in" });
//         } else {
//           res.render("login.ejs", { message: "Incorrect password" });
//         }
//       });
//     } else {
//       res.render("login.ejs", { message: "User not found Plz sign up" });
//     }
//   } catch (error) {
//     res.render("login.ejs", { message: "Login error : " + error });
//   }
// });

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
    res.render("cart.ejs", { items: itemArray });
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
    res.render("userCart.ejs", { items: itemList });
  } catch (error) {
    console.log("error" + error);
  }
});

//used for getting cart of a logged in user
app.get("/cart", validateToken, async (req, res) => {
  const userId = req.user.id;
  const itemList = await displayCart(userId, Users, carts);
  console.log(itemList);
  res.render("userCart.ejs", { items: itemList });
});

export { productDetails };
reload(app);
