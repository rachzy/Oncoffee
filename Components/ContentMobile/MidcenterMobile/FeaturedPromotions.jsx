import React, { useState, useEffect } from "react";

import Axios from "axios";

import ProductCard from "./FeaturedPromotions/ProductCard";

import displayError from "../../../globalFunctions/displayErrors";
import SeeMoreCard from "./SeeMoreCard";

const FeaturedPromotions = () => {
  //Set initial state as a loading state
  function initialState() {
    return { isLoading: true };
  }

  //Get server Url (Ex: "http://localhost:3001")
  const { serverUrl } = require("../../../connection.json");

  //State to store all the slide images
  const [products, setProducts] = useState([initialState()]);

  //useEffect function to set the state of the slides
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await Axios.get(
        `${serverUrl}/getslides/featuredpromotions`
      );
      if (!data || data.length === 0) return;
      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }
      setProducts(data);
    };
    fetchProducts();
  }, [serverUrl]);

  return (
    <main className="midmobile">
      <h2>Promoções Relampago</h2>
      <div className="midmobile-overflow">
        {products.map((product) => {
          if (product.isLoading) return;
          return (
            <ProductCard
              key={product.productId}
              productName={product.productName}
              imgSrc={product.productImgSrc}
              imgAlt={product.productImgAlt}
              realPrice={product.productPrice}
              discountPercentage={product.productDiscount}
              endDate={product.slideEndDate}
              hrefPage={`./product/${product.productId}`}
            />
          );
        })}
        <SeeMoreCard />
      </div>
    </main>
  );
};

export default FeaturedPromotions;
