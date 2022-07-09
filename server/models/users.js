const mongoose = require("mongoose");

const userFavoriteProducts = [
  {
    productId: {
      type: Number,
      required: true,
    },
    likedAt: {
      type: Date,
      required: true,
      default: Date(),
    },
  },
];

const usersSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userLastName: {
    type: String,
    required: true,
  },
  userPfp: {
    type: String,
    required: true,
    default: "default-pfp.png",
  },
  userFavoriteProducts: {
    type: userFavoriteProducts,
    required: false,
  },
});

module.exports = mongoose.model("Users", usersSchema);
