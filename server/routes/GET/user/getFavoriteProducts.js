const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const Users = require("../../../models/users.js");

const server = require("../../../server.js");

//Get all the favorited products of an user
router.get("/", (req, res) => {
  const { userId } = req.cookies;

  if (!userId) return;

  res.writeHead(200, { "Content-Type": "application/json" });
  server.db.query(
    "SELECT userFavoriteProducts FROM users WHERE userId = ?",
    [userId],
    (err, result) => {
      if (err) return sendError(res, err.code, err.errno);

      if (!result[0]) return;

      if (result[0].userFavoriteProducts === "") {
        //Return a null JSON to make the program don't read it as undefined, but as emtpy
        res.write("[]");
        res.end();
        return;
      }
      const favoriteProductsIds = result[0].userFavoriteProducts;

      //Split the value and each value of the string will correspond to a different productId
      const splitFavProductsIds = favoriteProductsIds.split(",");

      res.write("[");

      let amountOfLoadedProducts = 0;
      splitFavProductsIds.map((pId) => {
        //Select all the necessary data about that product according to it Id
        return server.db.query(
          `SELECT productId, productName, productDescription, productImgSrc, productImgAlt, productFinalPrice FROM products WHERE productId = ${pId}`,
          (err2, result2) => {
            if (err2) return;

            if (!result2[0] || result2.length === 0) return;

            let finalReturn = {
              ...result2[0],
            };

            //Write the product data on the page in JSON format
            res.write(JSON.stringify(finalReturn, null, 3));

            //If the product is the last one on the list, write a "]" and end the response
            if (amountOfLoadedProducts === splitFavProductsIds.length - 1) {
              res.write("]");
              res.end();
              return;
            }
            //Else, write a ",", break a row and keep running
            res.write(", \n");
            amountOfLoadedProducts++;
          }
        );
      });
    }
  );
});

module.exports = router;
