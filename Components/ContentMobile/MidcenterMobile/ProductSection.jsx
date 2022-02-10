import React, {useState, useEffect} from "react";

import Axios from 'axios';

import displayError from "../../../globalFunctions/displayErrors";

import ProductLine from "./ProductSection/ProductLine";
import Product from "./ProductSection/Product";

const ProductSection = ({ title, category }) => {
  const [products, setProducts] = useState([]);

  //Get products from the Database by using Axios through GET method
  const { serverUrl } = require("../../../connection.json"); //Import serverUrl (Ex: http://localhost:3001);
  useEffect(() => {
    const fetchProducts = async () => {
      await Axios.get(`${serverUrl}/getproducts/${category}`).then(
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
  }, [serverUrl, category]);
  return (
    <ProductLine title={title} category={category}>
      {products.map((product) => {
        return (
          <Product
            key={product.productId}
            productId={product.productId}
            productName={product.productName}
            productImgSrc={product.productImgSrc}
            productImgAlt={product.productImgAlt}
            productFinalPrice={product.productFinalPrice}
            productDiscount={product.productDiscount}
          />
        );
      })}
    </ProductLine>
  );
};

export default ProductSection;
