//Oncoffee server-side (by r4ch)
//Sets the PORT that the server gonna be hosted on
const PORT = 3001;

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

app.use(cors());
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
  res.sendStatus(200);
});

//Get (single) Product Router
const getProductRouter = require("./routes/GET/getProduct");
app.use("/getproduct/", getProductRouter);

//Get (many) Products Router
const getProductsRouter = require("./routes/GET/getProducts.js");
app.use("/getproducts/", getProductsRouter);

const getSlidesRouter = require("./routes/GET/getSlides.js");
app.use("/getslides/", getSlidesRouter);

//Get (many) Searches according to UserId Router
const getUserSearchesRouter = require("./routes/GET/getUserSearches.js");
app.use("/getusersearches/", getUserSearchesRouter);

const getProductsForSearchesRouter = require("./routes/GET/getProductsForSearches.js");
app.use("/getproductsforsearches/", getProductsForSearchesRouter);

const getCategoriesRouter = require("./routes/GET/getCategories.js");
app.use("/getcategories/", getCategoriesRouter);

const getFavoriteProductsIds = require("./routes/GET/getFavoriteProductsIds.js");
app.use("/getfavoriteproductsids/", getFavoriteProductsIds);

const getFavoriteProducts = require("./routes/GET/getFavoriteProducts.js");
app.use("/getfavoriteproducts/", getFavoriteProducts);

//GET => ACCOUNT

//Get User Security Tokens Router
const getUserSecurityTokens = require("./routes/GET/getUserSecurityTokens.js");
app.use("/getusersecuritytokens/", getUserSecurityTokens);

//Verify Security Tokens
const getVerifySecurityTokens = require("./routes/GET/getVerifySecurityTokens.js");
app.use("/verifysecuritytokens/", getVerifySecurityTokens);

//Validate Register Params
const getValidateRegisterParams = require("./routes/GET/getValidateRegisterParams.js");
app.use("/account/validateregisterparams", getValidateRegisterParams);







//POST METHODS

const postSearchRouter = require("./routes/POST/postSearch.js");
app.use("/postsearch/", postSearchRouter);

const postFavoriteProduct = require("./routes/POST/postFavoriteProduct.js");
app.use("/postfavoriteproduct/", postFavoriteProduct);

//POST => ACCOUNT

const postUserRegister = require("./routes/POST/postUserRegister.js");
app.use("/account/register/", postUserRegister);

const postSetVerificationEmail = require("./routes/POST/postSetVerificationEmail.js");
app.use("/account/setverificationemail", postSetVerificationEmail);

const postResendVerificationEmail = require("./routes/POST/postResendVerificationEmail.js");
app.use("/account/resendverificationemail", postResendVerificationEmail);

const postVerifyAccount = require("./routes/POST/postVerifyAccount.js");
app.use("/account/verify", postVerifyAccount);

//Host the server on it's port (Default is 3001);
const server = app.listen(PORT, () => {
  console.log("Server hosted on http://localhost:" + PORT);
});

module.exports.db = db;
