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
  handleRemoveCartProduct,
  handleFavoritedProductsChange,
  handleSetPopupState,
  cartProducts,
}) => {
  const [products, setProducts] = useState([]);

  //Get products from the Database by using Axios through GET method
  const { serverUrl, displayError } = useContext(GlobalServerContext); //Import serverUrl (Ex: http://localhost:3001);

  //Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/products/getmany/${category}`
        );

        if (data.isError) return displayError(data.errorCode, data.errno);

        setProducts(data);
      } catch (err) {
        displayError(err.message, "INTERNAL_ERROR");
      }
    };
    fetchProducts();
  }, [serverUrl, displayError, category]);

  const renderProduct = (product) => {
    return (
      <Product
        key={`${product.productId}`}
        productId={product.productId}
        productName={product.productTitle}
        productImage={product.productImage}
        productCategory={product.productCategory}
        productFinalPrice={product.productPrice.finalPrice}
        productDiscount={product.productPrice.discount}
        productDescription={product.productDescription}
        productGrade={product.productRate.finalRate}
        productTotalSales={product.productTotalOrders}
        setFavoriteProductsIds={setFavoritedProductsIds}
        favoritedProductsIds={favoritedProductsIds}
        handleAddCartProduct={handleAddCartProduct}
        handleRemoveCartProduct={handleRemoveCartProduct}
        handleSetPopupState={handleSetPopupState}
        handleFavoritedProductsChange={handleFavoritedProductsChange}
        cartProducts={cartProducts}
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
              //If the product that corresponds to that fd doesn't exist, stop the execution
              if (
                !products[productNumber - 1] ||
                product !== products[productNumber]
              )
                return null;

              //If the product is divisible by 5, that means that 5 products have already been loaded, and
              //that a new column need to be rendered
              const checkIfProductIdIsDivisibleBy5 = (productNumber - 1) % 5;

              if (checkIfProductIdIsDivisibleBy5 !== 0) return null;

              return (
                //Load the new column
                <ProductLine
                  key={`${product.productId}${productNumber}`}
                  category={category}
                >
                  {/* Load the product by itself */}
                  {renderProduct(product)}
                  {/* Load other 4 products */}
                  {products.map((insideProduct) => {
                    // const productIdPlus3 = parseInt(productNumber) + 3;

                    // for (let i = productNumber; i <= productIdPlus3; i++) {
                    //   if(insideProduct !== products[i]) return null;
                    //   return <>{renderProduct(insideProduct)}</>;
                    // }
                    // return null;

                    // I WANNA CLARIFY THAT WHAT I DID HERE WAS 100% AGAINST MY WANT! FOR SOME REASON THE FOR LOOP
                    // WASN'T WORKING, I TRIED DOING IT WITH WHILE AND IT DIDN'T WORK AS WELL, THE NUMBERS WEREN'T INCREASING
                    //AS THEY SHOULD, SO MY ONLY OPTIONS WAS CODE THIS SHIT THAT YOU'RE ABOUT TO SEE
                    //IF SOMEONE IS EVER READING THAT, PLEASE NOW THAT THIS WASN'T MY FAULT AND I HAD NO CHOICE!!!!!!

                    const productNumberInt = parseInt(productNumber);
                    const productNumbersThatShouldBeRendered = [
                      productNumberInt,
                      productNumberInt + 1,
                      productNumberInt + 2,
                      productNumberInt + 3,
                    ];

                    return productNumbersThatShouldBeRendered.map(
                      (productInsideNumber) => {
                        if (insideProduct === products[productInsideNumber]) {
                          return renderProduct(insideProduct);
                        }
                        return null;
                      }
                    );
                  })}
                </ProductLine>
              );
            }
          );
          return returnProducts;
        })}
      </>
    );
  };

  //If bottomBtn is not undefined, that means that it exists and it needs to be rendered
  const renderBottomBtn = () => {
    if (!bottomBtn) return null;
    return (
      <BottomBtn returnMoreProductsFunction={returnMoreProducts}>
        {bottomBtn}
      </BottomBtn>
    );
  };

  return (
    <main className="midcontent">
      <ProductLineTitle href={hrefPage}>{productLineTitle}</ProductLineTitle>

      <ProductLine category={category}>
        {products.map((product) => {
          let productId;
          if (products.length > 5) {
            for (let i = 0; i <= products.length; i++) {
              if (product === products[i]) {
                productId = i;
              }
            }
          }
          if (productId >= 5) return null;
          return renderProduct(product);
        })}
      </ProductLine>

      {renderBottomBtn()}
    </main>
  );
};

export default ProductSection;
