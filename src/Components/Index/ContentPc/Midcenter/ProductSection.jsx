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
  favoriteProducts,
  handleAddCartProduct,
  handleRemoveCartProduct,
  handleAddFavoriteProduct,
  handleRemoveFavoriteProduct,
  handleSetPopupState,
  cartProducts,
}) => {
  const [products, setProducts] = useState([]);
  const [productsRendered, setProductsRendered] = useState([]);

  //Get products from the Database by using Axios through GET method
  const { serverUrl, displayError } = useContext(GlobalServerContext); //Import serverUrl (Ex: http://localhost:3001);

  //Fetch all products
  useEffect(() => {
    //Simple function that will set the first 5 products received through an array given in params as the first values of productsRendered state
    const setProductsRenderedInitialValue = (products) => {
      if(!products || products.length === 0) return;
      let initialProducts = []

      for (let i = 0; i <= 4; i++) {
        if (!products[i]) return;
        initialProducts.push(products[i])
      }

      setProductsRendered(initialProducts);
    }

    //Fetch products from database
    const fetchProducts = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/products/getmany/${category}`
        );

        if (data.isError) return displayError(data.errorCode, data.errno);

        setProducts(data);
        setProductsRenderedInitialValue(data);
      } catch (err) {
        displayError(err.message, "INTERNAL_ERROR");
      }
    };
    fetchProducts();
  }, [serverUrl, displayError, category]);

  //Simple function that returns a product according to the given param
  const renderProduct = (product) => {
    return (
      <Product
        key={product.productId}
        productId={product.productId}
        productName={product.productTitle}
        productImage={product.productImage}
        productCategory={product.productCategory}
        productFinalPrice={product.productPrice.finalPrice}
        productDiscount={product.productPrice.discount}
        productDescription={product.productDescription}
        productGrade={product.productRate.finalRate}
        productTotalSales={product.productTotalOrders}
        favoriteProducts={favoriteProducts}
        handleAddCartProduct={handleAddCartProduct}
        handleRemoveCartProduct={handleRemoveCartProduct}
        handleSetPopupState={handleSetPopupState}
        handleAddFavoriteProduct={handleAddFavoriteProduct}
        handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
        cartProducts={cartProducts}
      />
    );
  };

  //Function that will be triggered when bottomBtn is clicked
  //It adds 5 more products in productsRendered state
  const returnMoreProducts = (lastLoadedProduct) => {
    let productsThatNeedToBeLoaded = [];
    for (let i = 0; i <= lastLoadedProduct + 5; i++) {
      if (products[i]) {
        productsThatNeedToBeLoaded.push(products[i]);
      }
    }
    setProductsRendered(productsThatNeedToBeLoaded);
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

  //Function that will render a single product line for every 5 products rendered
  const renderProductLines = () => {
    if (!productsRendered && productsRendered.length === 0) return;

    return productsRendered.map((product) => {
      let mayRender = false; //Determines if the product really needs to generate a whole new ProductLine just for it
      let productPosition = 0; //Gets the product position in productsRendered array

      for (let i = 0; i <= productsRendered.length - 1; i += 5) {
        //If the current product corresponds to a number that is multiple of 5, then it should create a new product line
        if (product === productsRendered[i]) {
          productPosition = i;
          mayRender = true;
        }
      }

      //If mayRender is false, no product lines will be rendered
      if (!mayRender) return null;


      let productsThatWillBeRendered = []; //Array that will save all the products that will be rendered in that specific product line
      
      //Get every product that have to be rendered, starting from the position value saved in productPosition + 4, since we need to render that product plus 4 other ones
      for (let j = productPosition; j <= productPosition + 4; j++) {
        if (products[j]) {
          productsThatWillBeRendered.push(products[j]);
        }
      }

      //Check if the array is not empty
      if (productsThatWillBeRendered.length === 0) return null;

      //If everything worked correctly, return a new product line that will render every product from that specific line
      return (
        <ProductLine
          key={productsThatWillBeRendered[0]["productId"]}
          category={category}
        >
          {renderProducts(productsThatWillBeRendered)}
        </ProductLine>
      );
    });
  };

  //Simple function that will render products passed through params
  const renderProducts = (products) => {
    return products.map((product) => {
      return renderProduct(product);
    });
  };

  return (
    <main className="midcontent">
      <ProductLineTitle href={hrefPage}>{productLineTitle}</ProductLineTitle>

      {renderProductLines()}

      {renderBottomBtn()}
    </main>
  );
};

export default ProductSection;
