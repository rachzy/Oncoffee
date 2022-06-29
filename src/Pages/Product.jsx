import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ContentPC from "../Components/Product/ContentPC";
import ContentMobile from "../Components/Product/ContentMobile";

const Product = ({
  pageTitle,
  setHeaderPageTitle,
  favoriteProducts,
  handleFavoriteProductsChange,
  cartProducts,
  handleAddCartProduct,
}) => {
  useEffect(() => {
    setHeaderPageTitle(pageTitle);
  }, [pageTitle, setHeaderPageTitle]);

  const params = useParams();
  const { productId } = params;

  const randomId = () => {
    return Math.floor(Math.random() * 999999999 + 10000000);
  };

  //Product State
  const [product, setProduct] = useState({
    productId: productId,
    productTitle: "Café 3 corações",
    productBrand: "3Corações",
    productImage: "cafegourmet.png",
    productDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident odio sequi mollitia quo ipsa, cum corporis expedita eveniet cupiditate voluptates, recusandae ab itaque assumenda minima. Iure ratione cumque non aspernatur.",
    productRemainingAmount: 21,
    productTotalOrders: 150,
    productPrice: {
      realPrice: 120,
      discount: 50,
      installments: 12,
      interestRate: 5,
      freight: 120,
    },
    productDetails: [
      {
        id: randomId(),
        title: "Grãos",
        description: "Bla bla bla",
      },
      {
        id: randomId(),
        title: "Sementes",
        description: "Bla bla bla",
      },
      {
        id: randomId(),
        title: "Torradeiras",
        description: "Bla bla bla",
      },
      {
        id: randomId(),
        title: "Alguma coisa",
        description: "Bla bla bla",
      },
      {
        id: randomId(),
        title: "Coisa alguma",
        description: "Bla bla bla",
      },
    ],
    productImages: [
      {
        src: "cafegourmet.png",
        alt: "cafe-gourmet",
      },
      {
        src: "Combo_CafesGourmet.png",
        alt: "combo-cafesgourmet",
      },
      {
        src: "capsula-de-cafe-espresso-pimpinela-gourmet-tres-01.png",
        alt: "capsula-cafe",
      },
    ],
    productRate: {
      oneStars: 100,
      twoStars: 350,
      threeStars: 175,
      fourStars: 394,
      fiveStars: 498,
    },
    productComments: [
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 4,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 4,
      },
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 4,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 4,
      },
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 4,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 4,
      },
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 4,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 4,
      },
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 4,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 4,
      },
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 5,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 4,
      },
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 5,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 4,
      },
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 5,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 4,
      },
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 5,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 4,
      },
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 5,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 4,
      },
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 5,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 4,
      },
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 5,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 4,
      },
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 5,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 4,
      },
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 5,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 5,
      },
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        pfp: "1629903043818.jpg",
        level: 5,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 3,
      },
    ],
  });

  //State that controls the amount of products that will be bought by the user
  const [amount, setAmount] = useState(1);
  return (
    <>
      <ContentPC
        product={product}
        favoriteProducts={favoriteProducts}
        handleFavoriteProductsChange={handleFavoriteProductsChange}
        cartProducts={cartProducts}
        handleAddCartProduct={handleAddCartProduct}
        amount={amount}
        setAmount={setAmount}
      />
      <ContentMobile
        product={product}
        amount={amount}
        setAmount={setAmount}
        favoriteProducts={favoriteProducts}
        handleFavoriteProductsChange={handleFavoriteProductsChange}
      />
    </>
  );
};

export default Product;
