import React, { useEffect, useState } from "react";

import Axios from "axios";
import getCookie from "../../globalFunctions/getCookie";
import displayError from "../../globalFunctions/displayErrors";

import CafeGourmetImg from "../../imgs/cafegourmet.png";

import ProductSection from "./Midcenter/ProductSection";
import SliderFeaturedPc from "./Midcenter/SliderFeaturedPc";
import Warranty from "./Midcenter/Warranty";
import SocialMedias from "./Midcenter/SocialMedias";
import Finalinfo from "./Midcenter/FinalInfo";

const Midcenter = ({
  handleFavoritedProductsChange,
  handleAddCartProduct,
  handleSetPopupState,
}) => {
  const returnSliderFeaturedPromotions = () => {
    if (slideProductsIds.length === 0) return;
    return <SliderFeaturedPc slidesProductsIds={slideProductsIds} />;
  };

  const { serverUrl } = require("../../connection.json");

  const userId = getCookie("UID");

  const [slideProductsIds, setSlideProductsIds] = useState([]);
  const [favoritedProductsIds, setFavoritedProductsIds] = useState();

  useEffect(() => {
    const fetchSlides = async () => {
      const { data } = await Axios.get(
        `${serverUrl}/getslides/featuredpromotions`
      ).catch(() => {
        return displayError("0", "SERVER_CONN_FAILED");
      });

      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }

      setSlideProductsIds(data);
    };
    fetchSlides();

    const fetchFavoritedProductsIds = async () => {
      if (!userId) return;
      const { data } = await Axios.get(
        `${serverUrl}/getfavoriteproductsids/${userId}`
      ).catch((error) => {
        return displayError("0", "SERVER_CONN_FAILED");
      });

      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }

      if (!data) return;
      setFavoritedProductsIds(data);
    };
    fetchFavoritedProductsIds();
  }, [userId, serverUrl]);

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
