//Oncoffee server-side (by r4ch)
//Sets the PORT that the server gonna be hosted on
require("dotenv").config();
const PORT = process.env.PORT || 8000;

//Libs
const Express = require("express");
const app = new Express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//Creates the connection with the database
// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "oncoffee",
// });

//Security Libs
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const hpp = require("hpp");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

//Security section
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ credentials: true, origin: true }));
app.use(helmet());
app.use(hpp());
app.use(morgan("dev"));

app.disable("x-powered-by");

// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// 	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })

// app.use(limiter);

app.use(Express.json());

const connection = async () => {
  try {
    console.log("Connecting to MongoDB server...");
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Successfully connected to MongoDB server");
  } catch (err) {
    console.log("Error while trying to connect to MongoDB server: ", err);
    connection();
  }
};
const db = mongoose.connection;

//GET METHODS

//Router to check if the server is online
app.get("/", async (req, res) => {
  const { readyState } = db;
  if (readyState === 1) {
    return res.sendStatus(200);
  }
  return res.sendStatus(500);
});

//GET METHODS => PRODUCTS

//Get (single) Product Router
const getProductRouter = require("./routes/GET/products/getProduct");
app.use("/products/getsingle/", getProductRouter);

//Get (many) Products Router
const getProductsRouter = require("./routes/GET/products/getProducts.js");
app.use("/products/getmany/", getProductsRouter);

const getProductsForSearchesRouter = require("./routes/GET/products/getProductsForSearches.js");
app.use("/products/getsearches/", getProductsForSearchesRouter);

//GET METHODS => ADS

const getSlidesRouter = require("./routes/GET/ads/getSlides.js");
app.use("/ads/getslides/", getSlidesRouter);

//GET METHODS => CATEGORIES

const getCategoriesRouter = require("./routes/GET/categories/getCategories.js");
app.use("/categories/get/", getCategoriesRouter);

//GET METHODS => USER

//Get (many) Searches according to UserId Router
const getUserSearchesRouter = require("./routes/GET/user/getUserSearches.js");
app.use("/user/getsearches/", getUserSearchesRouter);

const getFavoriteProducts = require("./routes/GET/user/getFavoriteProducts.js");
app.use("/user/getfavoriteproducts/", getFavoriteProducts);

//GET METHODS => ACCOUNT

//Verify Security Tokens
const getValidateSecurityTokens = require("./routes/GET/account/getValidateSecurityTokens.js");
app.use("/account/validatetokens/", getValidateSecurityTokens);

//Validate Register Params
const getValidateRegisterParams = require("./routes/GET/account/register/getValidateRegisterParams.js");
app.use("/account/register/validateparams", getValidateRegisterParams);

//Sign out user
const getSignOut = require("./routes/GET/account/signOut.js");
app.use("/account/signout", getSignOut);

//

//POST METHODS

//POST METHODS => USER

const postFavoriteProduct = require("./routes/POST/user/postFavoriteProduct.js");
app.use("/user/postfavoriteproduct/", postFavoriteProduct);

const addFavoriteProduct = require("./routes/POST/user/addFavoriteProduct.js");
app.use("/user/addfavoriteproduct/", addFavoriteProduct);

const postSearchRouter = require("./routes/POST/user/postSearch.js");
app.use("/user/postsearch/", postSearchRouter);

//POST METHODS => ACCOUNT

const postAccountRegister = require("./routes/POST/account/Register/postAccountRegister.js");
app.use("/account/register/", postAccountRegister);

const postSetVerificationEmail = require("./routes/POST/account/Email/postSetVerificationEmail.js");
app.use("/account/setverificationemail", postSetVerificationEmail);

const postResendVerificationEmail = require("./routes/POST/account/Email/postResendVerificationEmail.js");
app.use("/account/resendverificationemail", postResendVerificationEmail);

const postVerifyAccount = require("./routes/POST/account/Register/postVerifyAccount.js");
app.use("/account/verify", postVerifyAccount);

const postAccountLogin = require("./routes/POST/account/Login/postAccountLogin.js");
app.use("/account/login", postAccountLogin);

//POST METHODS => PRODUCT

const createProduct = require("./routes/POST/products/createProduct.js");
app.use("/product/create", createProduct);

//POST METHODS => ADS

const createAd = require("./routes/POST/ads/createAd.js");
app.use("/ads/create", createAd);

//POST METHODS => CATEGORIES

// const postCategory = require("./routes/POST/category/createCategory.js");
// app.use("/category/create", postCategory);

//POST METHODS => PROMOTIONS

const createPromotion = require("./routes/POST/promotions/createPromotion.js");
app.use("/promotions/create", createPromotion);

//

//DELETE METHODS

//DELETE METHODS => USER

const removeFavoriteProduct = require("./routes/DELETE/user/removeFavoriteProduct.js");
app.use("/user/removefavoriteproduct", removeFavoriteProduct);

//Host the server on it's port (Default is 3001);
const server = app.listen(PORT, () => {
  console.log("Server hosted on http://localhost:" + PORT);
  connection();
});
