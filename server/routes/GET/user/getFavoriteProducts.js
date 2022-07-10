const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const Users = require("../../../models/users.js");
const Products = require("../../../models/products.js");

//Get all the favorited products of an user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) return;

  try {
    const { userFavoriteProducts } = await Users.findOne({userId: userId}, {userFavoriteProducts: 1});

    let getUserFavoriteProducts = [];
    for(let i = 0; i <= userFavoriteProducts.length - 1; i++) {
      const getProduct = await Products.findOne({productId: userFavoriteProducts[i].productId});
      getUserFavoriteProducts.push(getProduct);
    }

    res.send(getUserFavoriteProducts);
  } catch(err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;
