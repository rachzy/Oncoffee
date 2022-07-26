import React, { useContext, useEffect, useState } from "react";

import Axios from "axios";

import CafeGourmetImg from "../../../imgs/cafegourmet.png";

import ProductSection from "./Midcenter/ProductSection";
import SliderFeaturedPc from "./Midcenter/SliderFeaturedPc";
import Warranty from "./Midcenter/Warranty";

import { GlobalServerContext } from "../../../App";

const Midcenter = ({
  handleAddFavoriteProduct,
  handleRemoveFavoriteProduct,
  handleAddCartProduct,
  handleRemoveCartProduct,
  handleSetPopupState,
  cartProducts,
  favoriteProducts,
}) => {
  const returnSliderFeaturedPromotions = () => {
    if (slideProductsIds.length === 0) return;
    return <SliderFeaturedPc slidesProductsIds={slideProductsIds} />;
  };

  const { serverUrl, displayError } = useContext(GlobalServerContext);

  const [slideProductsIds, setSlideProductsIds] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/ads/getslides/featuredpromotions`
        );

        if (data.isError) {
          displayError(data.errorCode, data.errno);
          return;
        }

        setSlideProductsIds(data);
      } catch (err) {
        return displayError(err.message, "SERVER_CONN_FAILED");
      }
    };
    fetchSlides();
  }, [displayError, serverUrl]);

  return (
    <main id="midcenter" className="midcenter">
      <ProductSection
        category="mostsolds"
        hrefPage="/"
        productLineTitle="Mais Vendidos"
        favoriteProducts={favoriteProducts}
        handleAddFavoriteProduct={handleAddFavoriteProduct}
        handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
        handleSetPopupState={handleSetPopupState}
        handleAddCartProduct={handleAddCartProduct}
        handleRemoveCartProduct={handleRemoveCartProduct}
        cartProducts={cartProducts}
      />
      <main className="midcenter">
        <ProductSection
          category="discount"
          hrefPage="/"
          productLineTitle="Com Desconto"
          favoriteProducts={favoriteProducts}
          handleAddFavoriteProduct={handleAddFavoriteProduct}
          handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
          handleSetPopupState={handleSetPopupState}
          handleAddCartProduct={handleAddCartProduct}
          handleRemoveCartProduct={handleRemoveCartProduct}
          cartProducts={cartProducts}
        />

        {returnSliderFeaturedPromotions()}
        <main className="midcenter">
          <ProductSection
            category="capsules"
            hrefPage="/"
            productLineTitle="Cápsulas"
            favoriteProducts={favoriteProducts}
            handleAddFavoriteProduct={handleAddFavoriteProduct}
            handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
            handleSetPopupState={handleSetPopupState}
            handleAddCartProduct={handleAddCartProduct}
            handleRemoveCartProduct={handleRemoveCartProduct}
            cartProducts={cartProducts}
          />

          <main className="midcenter">
            <ProductSection
              category="otherproducts"
              hrefPage="/"
              productLineTitle="Outros Produtos"
              bottomBtn="Carregar Mais"
              favoriteProducts={favoriteProducts}
              handleAddFavoriteProduct={handleAddFavoriteProduct}
              handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
              handleSetPopupState={handleSetPopupState}
              handleAddCartProduct={handleAddCartProduct}
              handleRemoveCartProduct={handleRemoveCartProduct}
              cartProducts={cartProducts}
            />

            <main className="infos">
              <main className="garantias">
                <Warranty
                  title="Garantia Tal"
                  imgSrc={CafeGourmetImg}
                  imgAlt="coffee-oncoffee"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minima pariatur rem repellendus numquam doloremque id
                  asperiores iure quibusdam commodi, aliquam, repellat hic
                  iusto? Laborum explicabo distinctio perferendis veniam cumque
                  nam!
                </Warranty>
                <Warranty
                  title="Garantia Tal"
                  imgSrc={CafeGourmetImg}
                  imgAlt="coffee-oncoffee"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minima pariatur rem repellendus numquam doloremque id
                  asperiores iure quibusdam commodi, aliquam, repellat hic
                  iusto? Laborum explicabo distinctio perferendis veniam cumque
                  nam!
                </Warranty>
                <Warranty
                  title="Garantia Tal"
                  imgSrc={CafeGourmetImg}
                  imgAlt="coffee-oncoffee"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minima pariatur rem repellendus numquam doloremque id
                  asperiores iure quibusdam commodi, aliquam, repellat hic
                  iusto? Laborum explicabo distinctio perferendis veniam cumque
                  nam!
                </Warranty>
                <Warranty
                  title="Garantia Tal"
                  imgSrc={CafeGourmetImg}
                  imgAlt="coffee-oncoffee"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minima pariatur rem repellendus numquam doloremque id
                  asperiores iure quibusdam commodi, aliquam, repellat hic
                  iusto? Laborum explicabo distinctio perferendis veniam cumque
                  nam!
                </Warranty>
              </main>
            </main>
          </main>
        </main>
      </main>
    </main>
  );
};

export default Midcenter;
