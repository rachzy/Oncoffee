const express = require("express");
const router = express.Router();

const sendError = require("../../../globalFunctions/sendError.js");

const Users = require("../../../models/users");

//Post a favorited product by a user on his column on table "users"
router.post("/", async (req, res) => {
  //Get params
  const { userId } = req.cookies;
  // const {userId} = req.body <== FOR TESTING
  const { productId } = req.body;

  if (!userId || !productId) return sendError(res, "INVALID_PARAMS", "");

  try {
    const { userFavoriteProducts } = await Users.findOne(
      { userId: userId },
      { userFavoriteProducts: 1 }
    );
    let isProductAlreadyFavorite = false;

    userFavoriteProducts.map((product) => {
      if (product.productId !== productId) return;
      return (isProductAlreadyFavorite = true);
    });

    if (isProductAlreadyFavorite) {
      await Users.updateOne(
        { userId: userId },
        { $pull: { userFavoriteProducts: { productId: productId } } }
      );
      return res.send({ queryStatus: 200, actionType: "pull" });
    }

    await Users.updateOne(
      { userId: userId },
      { $push: { userFavoriteProducts: { productId: productId } } }
    );

    res.send({ queryStatus: 200, actionType: "push" });
  } catch (err) {
    return sendError(res, err.message, err.code);
  }
});

module.exports = router;
