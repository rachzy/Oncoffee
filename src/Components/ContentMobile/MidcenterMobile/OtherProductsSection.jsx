import React, { useState, useEffect } from "react";

import Axios from "axios";

import displayError from "../../../globalFunctions/displayErrors";

import Product from "./OtherProductsSection/Product";
import SeeMoreCard from "./SeeMoreCard";

const OtherProductsSection = ({
  setFavoritedProductsIds,
  handleFavoritedProductsChange,
  favoritedProductsIds
}) => {
  const [products, setProducts] = useState([]);

  //Get products from the Database by using Axios through GET method
  const { serverUrl } = require("../../.././connection.json"); //Import serverUrl (Ex: http://localhost:3001);
  useEffect(() => {
    const fetchProducts = async () => {
      await Axios.get(`${serverUrl}/getproducts/otherproducts`).then(
        (response) => {
          const data = response.data;
          if (data.isError) {
            displayError(data.errorCode, data.errno);
            return;
          }
          setProducts(data);
        }
      );
    };
    fetchProducts();
  }, [serverUrl]);

  //Function that will be triggered when bottomBtn is clicked
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

          //Map the split that had been made and now each productNumber is separated
          const returnProducts = splitProductsThatNeedToBeLoaded.map(
            (productNumber) => {
              //How the productNumber is setted as a "string" and the program need it as an "int", convert it.
              const convertProductNumberToInt = Math.floor(productNumber);

              //If the product that corresponds to that productNumber doesn't exist, stop the execution
              if (!products[convertProductNumberToInt - 1]) return;

              //If the product corresponds to a product that need to be loaded, render it.
              if (product === products[convertProductNumberToInt - 1]) {
                if (productNumber > lastLoadedProduct) return;

                return (
                  <Product
                    key={product.productId}
                    productId={product.productId}
                    productName={product.productName}
                    productImgSrc={product.productImgSrc}
                    productImgAlt={product.productImgAlt}
                    productCategory={product.productCategory}
                    productFinalPrice={product.productFinalPrice}
                    productDiscount={product.productDiscount}
                    productAbout={product.productDescription}
                    productGrade={product.productGrade}
                    productTotalSales={product.productTotalSales}
                    setFavoriteProductsIds={setFavoritedProductsIds}
                    handleFavoritedProductsChange={
                      handleFavoritedProductsChange
                    }
                    favoritedProductsIds={favoritedProductsIds}
                  />
                );
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
              if (product === products[i]) {
                return (
                  <Product
                    key={product.productId}
                    productId={product.productId}
                    productName={product.productName}
                    productImgSrc={product.productImgSrc}
                    productImgAlt={product.productImgAlt}
                    productFinalPrice={product.productFinalPrice}
                    productDiscount={product.productDiscount}
                    setFavoriteProductsIds={setFavoritedProductsIds}
                    handleFavoritedProductsChange={
                      handleFavoritedProductsChange
                    }
                    favoritedProductsIds={favoritedProductsIds}
                  />
                );
              }
            }
            return;
          }
          return (
            <Product
              key={product.productId}
              productId={product.productId}
              productName={product.productName}
              productImgSrc={product.productImgSrc}
              productImgAlt={product.productImgAlt}
              productFinalPrice={product.productFinalPrice}
              productDiscount={product.productDiscount}
              setFavoritedProductsIds={setFavoritedProductsIds}
              handleFavoriteProductsChange={handleFavoritedProductsChange}
              favoritedProductsIds={favoritedProductsIds}
            />
          );
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
