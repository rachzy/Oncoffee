import React, { useContext, useEffect, useState } from "react";

import Axios from "axios";

import ProductLineTitle from "./ProductSection/ProductLineTitle";
import ProductLine from "./ProductSection/ProductLine";
import Product from "./ProductSection/Product";
import BottomBtn from "./BottomBtn";

import { GlobalServerContext } from "../../../../App";

const ProductSection = ({
  category,
  hrefPage,
  productLineTitle,
  bottomBtn,
  favoritedProductsIds,
  setFavoritedProductsIds,
  handleAddCartProduct,
  handleFavoritedProductsChange,
  handleSetPopupState,
}) => {
  const [products, setProducts] = useState([]);

  //Get products from the Database by using Axios through GET method
  const { serverUrl, displayError } = useContext(GlobalServerContext); //Import serverUrl (Ex: http://localhost:3001);

  //Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/getproducts/${category}`
        );

        if (data.isError) return displayError(data.errorCode, data.errno);

        setProducts(data);
      } catch (err) {
        displayError(err.message, "INTERNAL_ERROR");
      }
    };
    fetchProducts();
  }, [serverUrl, displayError, category]);

  //BOTTOM BTN //

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
              if (!products[convertProductNumberToInt - 1]) return null;

              //If the product corresponds to a product that need to be loaded, render it.
              if (product === products[convertProductNumberToInt - 1]) {
                if (productNumber > lastLoadedProduct) return null;

                //If the product is divisible by 5, that means that 5 products have already been loaded, and
                //that a new column need to be rendered
                const checkIfProductNumberIsDivisibleBy5 =
                  (productNumber - 1) % 5;

                if (checkIfProductNumberIsDivisibleBy5 === 0) {
                  return (
                    //Load the new column
                    <ProductLine key={product.productId} category={category}>
                      {/* Load the product by itself */}
                      <Product
                        key={product.productId}
                        productId={product.productId}
                        productName={product.productName}
                        productImgSrc={product.productImgSrc}
                        productImgAlt={product.productImgAlt}
                        productCategory={product.productCategory}
                        productFinalPrice={product.productFinalPrice}
                        productDiscount={product.productDiscount}
                        productDescription={product.productDescription}
                        productGrade={product.productGrade}
                        productTotalSales={product.productTotalSales}
                        setFavoriteProductsIds={setFavoritedProductsIds}
                        favoritedProductsIds={favoritedProductsIds}
                        handleAddCartProduct={handleAddCartProduct}
                        handleSetPopupState={handleSetPopupState}
                        handleFavoritedProductsChange={
                          handleFavoritedProductsChange
                        }
                      />
                      {/* Load other 4 products */}
                      {products.map((insideProduct) => {
                        const productNumberPlus3 =
                          Math.floor(productNumber) + 3;

                        for (
                          let i = productNumber;
                          i <= productNumberPlus3;
                          i++
                        ) {
                          if (insideProduct !== products[i]) return null;
                          return (
                            <Product
                              key={insideProduct.productId}
                              productId={insideProduct.productId}
                              productName={insideProduct.productName}
                              productImgSrc={insideProduct.productImgSrc}
                              productImgAlt={insideProduct.productImgAlt}
                              productCategory={insideProduct.productCategory}
                              productFinalPrice={
                                insideProduct.productFinalPrice
                              }
                              productDiscount={insideProduct.productDiscount}
                              productDescription={
                                insideProduct.productDescription
                              }
                              productGrade={insideProduct.productGrade}
                              productTotalSales={
                                insideProduct.productTotalSales
                              }
                              setFavoriteProductsIds={setFavoritedProductsIds}
                              favoritedProductsIds={favoritedProductsIds}
                              handleAddCartProduct={handleAddCartProduct}
                              handleSetPopupState={handleSetPopupState}
                              handleFavoritedProductsChange={
                                handleFavoritedProductsChange
                              }
                            />
                          );
                        }
                        return null;
                      })}
                    </ProductLine>
                  );
                }
              }
              return null;
            }
          );
          return returnProducts;
        })}
      </>
    );
  };

  //If bottomBtn is not undefined, that means that it exists and it needs to be rendered
  const renderBottomBtn = () => {
    if (bottomBtn) {
      return (
        <BottomBtn returnMoreProductsFunction={returnMoreProducts}>
          {bottomBtn}
        </BottomBtn>
      );
    }
  };

  return (
    <main className="midcontent">
      <ProductLineTitle href={hrefPage}>{productLineTitle}</ProductLineTitle>

      <ProductLine category={category}>
        {products.map((product) => {
          let productNumber;
          if (products.length > 5) {
            for (let i = 0; i <= products.length; i++) {
              if (product === products[i]) {
                productNumber = i;
              }
            }
          }
          if (productNumber >= 5) return null;
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
              productDescription={product.productDescription}
              productGrade={product.productGrade}
              productTotalSales={product.productTotalSales}
              setFavoriteProductsIds={setFavoritedProductsIds}
              favoritedProductsIds={favoritedProductsIds}
              handleAddCartProduct={handleAddCartProduct}
              handleSetPopupState={handleSetPopupState}
              handleFavoritedProductsChange={handleFavoritedProductsChange}
            />
          );
        })}
      </ProductLine>

      {renderBottomBtn()}
    </main>
  );
};

export default ProductSection;
