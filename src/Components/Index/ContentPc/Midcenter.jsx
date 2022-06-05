import React, { useContext, useEffect, useState } from "react";

import Axios from "axios";

import CafeGourmetImg from "../../../imgs/cafegourmet.png";

import ProductSection from "./Midcenter/ProductSection";
import SliderFeaturedPc from "./Midcenter/SliderFeaturedPc";
import Warranty from "./Midcenter/Warranty";
import SocialMedias from "./Midcenter/SocialMedias";
import Finalinfo from "./Midcenter/FinalInfo";

import { GlobalServerContext } from "../../../App";

const Midcenter = ({
  handleFavoritedProductsChange,
  handleAddCartProduct,
  handleRemoveCartProduct,
  handleSetPopupState,
  cartProducts
}) => {
  const returnSliderFeaturedPromotions = () => {
    if (slideProductsIds.length === 0) return;
    return <SliderFeaturedPc slidesProductsIds={slideProductsIds} />;
  };

  const { serverUrl, isLogged, displayError } = useContext(GlobalServerContext);

  const [slideProductsIds, setSlideProductsIds] = useState([]);
  const [favoritedProductsIds, setFavoritedProductsIds] = useState();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/getslides/featuredpromotions`
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

    const fetchFavoritedProductsIds = async () => {
      if (!isLogged) return;
      try {
        const { data } = await Axios.get(
          `${serverUrl}/user/getfavoriteproductsids/`,
          { withCredentials: true }
        );

        if (data.isError) {
          displayError(data.errorCode, data.errno);
          return;
        }

        if (!data) return;
        setFavoritedProductsIds(data);
      } catch (err) {
        return displayError(err.message, "SERVER_CONN_FAILED");
      }
    };
    fetchFavoritedProductsIds();
  }, [displayError, isLogged, serverUrl]);

  return (
    <main id="midcenter" className="midcenter">
      <ProductSection
        category="mostsolds"
        hrefPage="/"
        productLineTitle="Mais Vendidos"
        favoritedProductsIds={favoritedProductsIds}
        setFavoritedProductsIds={setFavoritedProductsIds}
        handleFavoritedProductsChange={handleFavoritedProductsChange}
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
          favoritedProductsIds={favoritedProductsIds}
          setFavoritedProductsIds={setFavoritedProductsIds}
          handleFavoritedProductsChange={handleFavoritedProductsChange}
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
            favoritedProductsIds={favoritedProductsIds}
            setFavoritedProductsIds={setFavoritedProductsIds}
            handleFavoritedProductsChange={handleFavoritedProductsChange}
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
              favoritedProductsIds={favoritedProductsIds}
              setFavoritedProductsIds={setFavoritedProductsIds}
              handleFavoritedProductsChange={handleFavoritedProductsChange}
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

              <main className="infos_text">
                <SocialMedias />
                <Finalinfo />
              </main>
            </main>
          </main>
        </main>
      </main>
    </main>
  );
};

export default Midcenter;
