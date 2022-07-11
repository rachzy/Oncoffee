import React, {useState, useEffect} from "react";

import Axios from 'axios';

import displayError from "../../../../globalFunctions/displayErrors";

import TopPromoProduct from "./TopPromo/TopPromoProduct";

const TopPromo = () => {
  const [products, setProducts] = useState([]);

  //Get products from the Database by using Axios through GET method
  const { serverUrl } = require("../../../../connection.json"); //Import serverUrl (Ex: http://localhost:3001);
  useEffect(() => {
    const fetchProducts = async () => {
      await Axios.get(`${serverUrl}/products/getmany/discount`).then(
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
  return (
    <main className="top-promo">
      <h2>Você Vai Gostar</h2>
      <div className="overflowpromo">
        {products.map(product => {
            return(
                <TopPromoProduct 
                key={product.productId}
                imgSrc={product.productImage}
                imgAlt={product.productTitle}
                productName={product.productTitle}
                productPrice={product.productPrice.realPrice}
                productFinalPrice={product.productPrice.finalPrice}
                productId={product.productId}
                />
            )
        })}
      </div>
    </main>
  );
};

export default TopPromo;
