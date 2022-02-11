import React, { useEffect, useRef, useState } from "react";

import Axios from "axios";
import getCookie from "../../globalFunctions/getCookie";
import displayError from "../../globalFunctions/displayErrors";

import CafeGourmetImg from "../../imgs/cafegourmet.png";

import ProductSection from "./Midcenter/ProductSection";
import SliderFeaturedPc from "./Midcenter/SliderFeaturedPc";
import Warranty from "./Midcenter/Warranty";
import SocialMedias from "./Midcenter/SocialMedias";
import Finalinfo from "./Midcenter/FinalInfo";

const Midcenter = ({ handleFavoritedProductsChange }) => {
  const userId = getCookie("UID");
  const [slideProductsIds, setSlideProductsIds] = useState([]);
  const [favoritedProductsIds, setFavoritedProductsIds] = useState();

  const { serverUrl } = require("../../connection.json");

  useEffect(() => {
    const fetchSlides = async () => {
      const { data } = await Axios.get(
        `${serverUrl}/getslides/featuredpromotions`
      );
      setSlideProductsIds(data);
    };
    fetchSlides();
  }, [serverUrl]);

  const returnSliderFeaturedPromotions = () => {
    if (slideProductsIds.length === 0) return;
    return <SliderFeaturedPc slidesProductsIds={slideProductsIds} />;
  };

  //Get all favorited products ids
  useEffect(() => {
    const fetchFavoritedProductsIds = async () => {
      if (!userId) return;
      const { data } = await Axios.get(
        `${serverUrl}/getfavoriteproductsids/${userId}`
      );
      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }
      if (!data) return;
      setFavoritedProductsIds(data);
    };
    fetchFavoritedProductsIds();
  }, [serverUrl]);

  return (
    <main id="midcenter" className="midcenter">
      <ProductSection
        category="mostsolds"
        hrefPage="/"
        productLineTitle="Mais Vendidos"
        favoritedProductsIds={favoritedProductsIds}
        setFavoritedProductsIds={setFavoritedProductsIds}
        handleFavoritedProductsChange={handleFavoritedProductsChange}
      />
      <main className="midcenter">
        <ProductSection
          category="discount"
          hrefPage="/"
          productLineTitle="Com Desconto"
          favoritedProductsIds={favoritedProductsIds}
          setFavoritedProductsIds={setFavoritedProductsIds}
          handleFavoritedProductsChange={handleFavoritedProductsChange}
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
