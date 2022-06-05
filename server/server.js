//Oncoffee server-side (by r4ch)
//Sets the PORT that the server gonna be hosted on
const PORT = 8000;

//Libs
const Express = require("express");
const app = new Express();
const mysql = require("mysql2");
const cookieParser = require("cookie-parser");

//Creates the connection with the database
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "oncoffee",
});

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

//GET METHODS

//Router to check if the server is online
app.get("/", (req, res) => {
  db.query("SELECT 1 + 1", (err, result) => {
    if(err) return res.sendStatus(500);
    if(result) return res.sendStatus(200);
  });
});

//Get (single) Product Router
const getProductRouter = require("./routes/GET/getProduct");
app.use("/getproduct/", getProductRouter);

//Get (many) Products Router
const getProductsRouter = require("./routes/GET/getProducts.js");
app.use("/getproducts/", getProductsRouter);

const getSlidesRouter = require("./routes/GET/getSlides.js");
app.use("/getslides/", getSlidesRouter);

const getProductsForSearchesRouter = require("./routes/GET/getProductsForSearches.js");
app.use("/getproductsforsearches/", getProductsForSearchesRouter);

const getCategoriesRouter = require("./routes/GET/getCategories.js");
app.use("/getcategories/", getCategoriesRouter);

//GET METHODS => USER

//Get (many) Searches according to UserId Router
const getUserSearchesRouter = require("./routes/GET/user/getUserSearches.js");
app.use("/getusersearches/", getUserSearchesRouter);

const getFavoriteProducts = require("./routes/GET/user/getFavoriteProducts.js");
app.use("/user/getfavoriteproducts/", getFavoriteProducts);

const getFavoriteProductsIds = require("./routes/GET/user/getFavoriteProductsIds.js");
app.use("/user/getfavoriteproductsids/", getFavoriteProductsIds);

//GET METHODS => ACCOUNT

//Verify Security Tokens
const getValidateSecurityTokens = require("./routes/GET/account/getValidateSecurityTokens.js");
app.use("/account/validatetokens/", getValidateSecurityTokens);

//Validate Register Params
const getValidateRegisterParams = require("./routes/GET/getValidateRegisterParams.js");
app.use("/account/validateregisterparams", getValidateRegisterParams);

//Sign out user
const getSignOut = require("./routes/GET/account/signOut.js");
app.use("/account/signout", getSignOut);

//

//POST METHODS

//POST METHODS => USER

const postFavoriteProduct = require("./routes/POST/user/postFavoriteProduct.js");
app.use("/user/postfavoriteproduct/", postFavoriteProduct);

const postSearchRouter = require("./routes/POST/user/postSearch.js");
app.use("/user/postsearch/", postSearchRouter);

//POST METHODS => ACCOUNT

const postUserRegister = require("./routes/POST/account/Register/postUserRegister.js");
app.use("/account/register/", postUserRegister);

const postSetVerificationEmail = require("./routes/POST/account/Email/postSetVerificationEmail.js");
app.use("/account/setverificationemail", postSetVerificationEmail);

const postResendVerificationEmail = require("./routes/POST/account/Email/postResendVerificationEmail.js");
app.use("/account/resendverificationemail", postResendVerificationEmail);

const postVerifyAccount = require("./routes/POST/account/Register/postVerifyAccount.js");
app.use("/account/verify", postVerifyAccount);

const postUserLogin = require("./routes/POST/account/Login/postUserLogin.js");
app.use("/account/login", postUserLogin);

//Host the server on it's port (Default is 3001);
const server = app.listen(PORT, () => {
  console.log("Server hosted on http://localhost:" + PORT);
});

module.exports.db = db;
