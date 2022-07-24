const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const Users = require("../../../models/users.js");
const Products = require("../../../models/products.js");

//Get all the favorited products of an user
router.get("/:identifier?", async (req, res) => {
  const { userId } = req.cookies;
  const { identifier } = req.params;

  if (!userId) return;

  try {
    const { userFavoriteProducts } = await Users.findOne(
      { userId: userId },
      { userFavoriteProducts: 1 }
    );

    let getUserFavoriteProducts = [];

    switch (identifier) {
      case "ids":
        for (let i = 0; i <= userFavoriteProducts.length - 1; i++) {
          const getProduct = await Products.findOne(
            {
              productId: userFavoriteProducts[i].productId,
            },
            { productId: 1 }
          );
          getUserFavoriteProducts.push(getProduct);
        }
      default:
        for (let i = 0; i <= userFavoriteProducts.length - 1; i++) {
          const getProduct = await Products.findOne(
            {
              productId: userFavoriteProducts[i].productId,
            },
            {
              _id: 0,
              productId: 1,
              productTitle: 1,
              productDescription: 1,
              productImage: 1,
              "productPrice.finalPrice": 1,
            }
          );
          getUserFavoriteProducts.push(getProduct);
        }
    }

    res.send(getUserFavoriteProducts);
  } catch (err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;
