import React, { useState, useEffect, useContext } from "react";

import Axios from "axios";

import Product from "./OtherProductsSection/Product";
import SeeMoreCard from "./SeeMoreCard";

import { GlobalServerContext } from "../../../../App";

const OtherProductsSection = ({
  handleAddFavoriteProduct,
  handleRemoveFavoriteProduct,
  favoriteProducts,
}) => {
  const [products, setProducts] = useState([]);

  //Get products from the Database by using Axios through GET method
  const { serverUrl, displayError } = useContext(GlobalServerContext); //Import serverUrl (Ex: http://localhost:3001);

  //Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/products/getmany/otherproducts`
        );

        if (data.isError) return displayError(data.errorCode, data.errno);

        setProducts(data);
      } catch (err) {
        displayError(err.message, "INTERNAL_ERROR");
      }
    };
    fetchProducts();
  }, [serverUrl, displayError]);

  const renderProduct = (product) => {
    const generateRandomElementId = Math.floor(Math.random() * 10000);
    return (
      <Product
        key={product.productId}
        productId={product.productId}
        productName={product.productTitle}
        productDescription={product.productDescription}
        productImgSrc={product.productImage}
        productImgAlt={product.productTitle}
        productFinalPrice={product.productPrice.finalPrice}
        productDiscount={product.productPrice.discount}
        handleAddFavoriteProduct={handleAddFavoriteProduct}
        handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
        favoriteProducts={favoriteProducts}
      />
    );
  };

  //Function that will be triggered when bottomBtn is clicked
  const returnMoreProducts = (lastLoadedProduct) => {
    let productsThatNeedToBeLoaded;
    //The first product that need to be loaded will always be the product number 6.
    //The last product that need to be loaded is the number of the last product that have already been loaded
    //+ 5 (because it will load other 5 products);
    for (let i = 6; i <= lastLoadedProduct + 5; i++) {
      //This part of the code will create a string inside of "productsThatNeedToBeLoaded" that will be numbers
      //Separated by comas (Ex: 12,13,14,15,16). The program will read every number that is between comas as
      //a product number (by splitting it)
      if (productsThatNeedToBeLoaded) {
        productsThatNeedToBeLoaded += `,${i}`;
      } else {
        productsThatNeedToBeLoaded = `${i}`;
      }
    }
    return (
      <>
        {products.map((product) => {
          //Split the final string by comas
          const splitProductsThatNeedToBeLoaded =
            productsThatNeedToBeLoaded.split(",");

          //Map the split that had been made and now each productId is separated
          const returnProducts = splitProductsThatNeedToBeLoaded.map(
            (productNumber) => {
              //How the productNumber is setted as a "string" and the program need it as an "int", convert it.
              const convertProductNumberToInt = Math.floor(productNumber);

              //If the product that corresponds to that productNumber doesn't exist, stop the execution
              if (!products[convertProductNumberToInt - 1]) return null;

              //If the product corresponds to a product that need to be loaded, render it.
              if (product === products[convertProductNumberToInt - 1]) {
                if (productNumber > lastLoadedProduct) return null;

                return renderProduct(product);
              }
              return null;
            }
          );
          return returnProducts;
        })}
      </>
    );
  };

  return (
    <>
      <h2 className="outros-name">Outros Produtos</h2>
      <main className="outros">
        {products.map((product) => {
          if (products.length > 5) {
            for (let i = 0; i < 5; i++) {
              if (product === products[i]) return renderProduct(product);
            }
            return null;
          }
          return renderProduct(product);
        })}
        <SeeMoreCard
          renderDiv={true}
          returnMoreProductsFunction={returnMoreProducts}
        />
      </main>
    </>
  );
};

export default OtherProductsSection;
