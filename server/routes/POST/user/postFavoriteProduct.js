const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const server = require("../../../server.js");

//Post a favorited product by a user on his column on table "users"
router.post("/", (req, res) => {
  //Get params
  const { userId } = req.cookies;
  const { productId } = req.body;

  if (!userId || !productId) return sendError(res, "INVALID_PARAMS", "");

  //First query, to get the product ids favorited by the user
  server.db.query(
    "SELECT userFavoriteProducts FROM users WHERE userId = ?",
    [userId],
    (err, result) => {
      if (err) return "sendError"(res, err.code, err.errno);

      if (!result || result.length === 0) return;

      //Get all the favorited product ids sent by the server
      const { userFavoriteProducts } = result[0];

      //String that will control if the update will add or remove a value
      let productAlreadyFavorited = false;

      if (userFavoriteProducts) {
        //Split the products on commas. Each value of the Array corresponds to a single product id
        let splitFavProducts = userFavoriteProducts.split(",");

        //Map the final array
        splitFavProducts.map((FavProductId) => {
          //If any of the product ids on the database is the same as the one that's being requested
          //that means that that product is already favorited by the user
          //Then, return "productAlreadyFavorited" as true
          if (productId.toString() === FavProductId) {
            return (productAlreadyFavorited = true);
          }
          return null;
        });

        if (productAlreadyFavorited) {
          //If the product is already favorited:

          let finalProductInsertion;

          if (productId.toString() === splitFavProducts[0]) {
            finalProductInsertion = `${productId},`;
          } else {
            finalProductInsertion = `,${productId}`;
          }

          if (splitFavProducts.length === 1)
            finalProductInsertion = `${productId}`;

          //Remove that product id from the column
          const newFavoriteProducts = userFavoriteProducts.replace(
            finalProductInsertion,
            ""
          );

          //Insert the new value of "FavoriteProducts" column
          return server.db.query(
            "UPDATE users SET userFavoriteProducts = ? WHERE userId = ?",
            [newFavoriteProducts, userId],
            (err) => {
              if (err) return sendError(res, err.code, err.errno);
            }
          );
        }
      }

      //If the product is not already favorited:

      //String that will be the new value of that column
      let favoriteProductsPlusNewProduct;

      if (!userFavoriteProducts) {
        favoriteProductsPlusNewProduct = `${productId}`;
      } else {
        favoriteProductsPlusNewProduct = `${userFavoriteProducts},${productId}`;
      }

      //Insert the new value on the column
      server.db.query(
        "UPDATE users SET userFavoriteProducts = ? WHERE userId = ?",
        [favoriteProductsPlusNewProduct, userId],
        (err) => {
          if (err) sendError(res, err.code, err.errno);
        }
      );
    }
  );
  res.end();
});

module.exports = router;
