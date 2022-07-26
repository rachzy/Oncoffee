const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const Users = require("../../../models/users");

//Set a specific product as favorite on a users' account
router.post("/", async (req, res) => {
  //Get params
  const { userId } = req.cookies;
//   const {userId} = req.body
  const { productId } = req.body;

  if (!userId || !productId) return sendError(res, "INVALID_PARAMS", "");

  try {
    const { userFavoriteProducts } = await Users.findOne(
      { userId: userId },
      { userFavoriteProducts: 1 }
    );
    let isProductAlreadyFavorite = false;

    userFavoriteProducts.map((product) => {
      if (product.productId.toString() !== productId.toString()) return;
      return (isProductAlreadyFavorite = true);
    });

    if (isProductAlreadyFavorite) {
      return sendError(res, "PRODUCT_ALREADY_FAVORITED")
    }

    await Users.updateOne(
      { userId: userId },
      { $push: { userFavoriteProducts: { productId: productId } } }
    );

    res.send({ queryStatus: 200 });
  } catch (err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;