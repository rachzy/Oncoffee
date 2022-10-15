import React, { useState, useEffect, useRef, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Axios from "axios";

import "../css/SearchPage.css";

import Product from "../Components/PageComponents/Product";
import FilterItem from "../Components/Search/FilterItem";
import FilterMethod from "../Components/Search/FilterMethod";
import displayError from "../globalFunctions/displayErrors";
import FilterBySelectBox from "../Components/Search/FilterBySelectBox";
import Loading from "../Components/PageComponents/Loading";

import { GlobalServerContext } from "../App";
import SearchProducts from "../Components/Search/RenderComponents/SearchProducts";
import SearchFilteringMethods from "../Components/Search/RenderComponents/SearchFilteringMethods";

const Search = ({
  setHeaderPageTitle,
  favoriteProducts,
  cartProducts,
  handleAddCartProduct,
  handleRemoveCartProduct,
  handleAddFavoriteProduct,
  handleRemoveFavoriteProduct,
}) => {
  //Config the page and Header title
  useEffect(() => {
    setHeaderPageTitle("Pesquisar");
  }, [setHeaderPageTitle]);

  //Get Global Server Context
  const { serverUrl } = useContext(GlobalServerContext);

  const navigate = useNavigate();

  //State that will get every search param
  const [searchParams, setSearchParams] = useSearchParams();

  //Show the content when the page is done loading
  const contentMain = useRef(null);
  useEffect(() => {
    if (!contentMain || !contentMain.current) return;
    contentMain.current.classList.add("active");
  }, [contentMain]);

  //Search states
  const [searchQueryData, setSearchQueryData] = useState({
    v: "",
    methods: [
      "GRAO",
      "MOIDO",
      "CAPSULAS",
      "SOLUVEIS",
      "SACHES",
      "DRIP_COFFEE",
      "COLD_BREW",
      "INFUSOR",
    ],
    types: ["AROMATIZADO", "ORGANICOS", "MICROLOTE", "DESCAFEINADOS"],
    intensities: ["SUAVE", "MEDIA", "INTENSA"],
    minPrice: 0,
    maxPrice: 0,
  });

  //Get all search params and save them into the SearchQueryData state
  useEffect(() => {
    const getAllSearchParams = {};
    searchParams.forEach((value, key) => {
      if (key === "v") {
        return (getAllSearchParams[key] = value.trim());
      }
      return (getAllSearchParams[key] = value.split(" "));
    });
    setSearchQueryData((currentValue) => ({
      ...currentValue,
      ...getAllSearchParams,
    }));
  }, [searchParams]);

  //Products state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsAccordingToUserSearch = async () => {
      if (!searchQueryData.v) return;
      try {
        const { data } = await Axios.get(
          `${serverUrl}/search/${searchQueryData.v}`
        );

        if (data.isError) {
          return displayError(data.errorCode, data.errno);
        }

        if (data.length === 0) {
          return setProducts({
            message: "Nenhum produto com esse nome/filtro foi encontrado...",
          });
        }
        setProducts(data);
      } catch (err) {
        displayError(err.message, err.code);
      }
    };
    fetchProductsAccordingToUserSearch();
  }, [searchQueryData, serverUrl]);

  //Array that will englobe every filtering method
  const [filteringMethods, setFilteringMethods] = useState([
    //FILTERING METHOD => Methods
    {
      id: "methods",
      title: "Método",
      items: [
        {
          id: "GRAO",
          title: "Grão",
          selected: true,
        },
        {
          id: "MOIDO",
          title: "Moído",
          selected: true,
        },
        {
          id: "CAPSULAS",
          title: "Cápsulas",
          selected: true,
        },
        {
          id: "SOLUVEIS",
          title: "Solúveis",
          selected: true,
        },
        {
          id: "SACHES",
          title: "Sachês",
          selected: true,
        },
        {
          id: "DRIP_COFFEE",
          title: "Drip coffee",
          selected: true,
        },
        {
          id: "COLD_BREW",
          title: "Cold Brew",
          selected: true,
        },
        {
          id: "INFUSOR",
          title: "Infusor",
          selected: true,
        },
      ],
    },
    //FILTERING METHOD => Types
    {
      id: "types",
      title: "Tipos",
      items: [
        {
          id: "AROMATIZADO",
          title: "Aromatizado",
          selected: true,
        },
        {
          id: "ORGANICOS",
          title: "Orgânicos",
          selected: true,
        },
        {
          id: "MICROLOTE",
          title: "Microlote",
          selected: true,
        },
        {
          id: "DESCAFEINADOS",
          title: "Descafeinados",
          selected: true,
        },
      ],
    },
    //FILTERING METHOD => Intensities
    {
      id: "intensities",
      title: "Intensidade",
      items: [
        {
          id: "SUAVE",
          title: "Suave",
          selected: true,
        },
        {
          id: "MEDIA",
          title: "Média",
          selected: true,
        },
        {
          id: "INTENSA",
          title: "Intensa",
          selected: true,
        },
      ],
    },
  ]);

  //Fetch methods items according to searchQuery data
  useEffect(() => {
    setFilteringMethods((currentValue) => {
      return currentValue.map((method) => {
        return {
          ...method,
          items: method.items.map((item) => {
            //If the item ID is not selected,
            //return the item with the property "selected" set as false
            if (!searchQueryData[method.id].includes(item.id))
              return {
                ...item,
                selected: false,
              };
            return item;
          }),
        };
      });
    });
  }, [searchQueryData]);

  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (!clicked) return;
  }, [clicked, filteringMethods, searchQueryData, navigate]);

  //Function that will be triggered when the user clicks in an option
  const handleItemClick = (itemId, methodId) => {
    setFilteringMethods((currentValue) => {
      //Constant that will save the new value of the state
      const newFilteringMethods = currentValue.map((method) => {
        if (method.id !== methodId) return method;
        return {
          ...method,
          items: method.items.map((item) => {
            if (item.id !== itemId) return item;
            return {
              ...item,
              selected: !item.selected,
            };
          }),
        };
      });

      //Redirect the user to a new page using the new state value
      navigate(
        `/search?v=${searchQueryData.v}&methods=${newFilteringMethods[0].items
          .map((method) => (method.selected ? method.id : ""))
          .join(" ")}&types=${newFilteringMethods[1].items
          .map((method) => (method.selected ? method.id : ""))
          .join(" ")}&intensities=${newFilteringMethods[2].items
          .map((method) => (method.selected ? method.id : ""))
          .join(" ")}`
      );

      //Set the new state value
      return newFilteringMethods;
    });
    setClicked(true);
  };

  return (
    <section ref={contentMain} className="conteudo conteudo-search">
      <main className="config_area">
        <h2 className="filtrar">Filtrar Por:</h2>
        <SearchFilteringMethods
          filteringMethods={filteringMethods}
          handleItemClick={handleItemClick}
        />
      </main>

      <main className="bigline">
        <div className="bigline_child"></div>
      </main>

      <main className="product_area">
        <main className="top_info">
          <h2>
            Resultados de busca para <span>"{searchQueryData.v}"</span>
          </h2>
          <FilterBySelectBox products={products} setProducts={setProducts} />
        </main>
        <main className="products">
          <SearchProducts
            products={products}
            favoriteProducts={favoriteProducts}
            cartProducts={cartProducts}
            handleAddCartProduct={handleAddCartProduct}
            handleRemoveCartProduct={handleRemoveCartProduct}
            handleAddFavoriteProduct={handleAddFavoriteProduct}
            handleRemoveFavoriteProduct={handleRemoveCartProduct}
          />

          {products.length !== 0 && !products.message && (
            <div className="load_btt">
              <input
                type="button"
                value="Carregar Mais"
                className="load_more"
              />
            </div>
          )}
        </main>
      </main>
    </section>
  );
};

export default Search;
