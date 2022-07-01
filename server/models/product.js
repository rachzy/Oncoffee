const mongoose = require("mongoose");

const productPrice = {
  realPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  installments: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  freight: {
    type: Number,
    required: true,
  },
};

const productDetails = [
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
];

const productImages = [
  {
    src: String,
    alt: String,
  },
];

const productRate = {
  oneStars: {
    type: Number,
    required: true,
  },
  twoStars: {
    type: Number,
    required: true,
  },
  threeStars: {
    type: Number,
    required: true,
  },
  fourStars: {
    type: Number,
    required: true,
  },
  fiveStars: {
    type: Number,
    required: true,
  },
};

const productComments = [
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    pfp: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rateGiven: {
      type: Number,
      required: true,
    },
  },
];

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  productTitle: {
    type: String,
    required: true,
  },
  productBrand: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productRemainingAmount: {
    type: Number,
    required: true,
  },
  productTotalOrders: {
    type: Number,
    required: true,
  },
  productPrice: {
    type: productPrice,
    required: true,
  },
  productDetails: {
    type: productDetails,
    required: true,
  },
  productImages: {
    type: productImages,
    required: true,
  },
  productRate: {
    type: productRate,
    required: true,
  },
  productComments: {
    type: productComments,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
