import Axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Product from "../Components/PageComponents/Product";
import FilterItem from "../Components/Search/FilterItem";
import FilterMethod from "../Components/Search/FilterMethod";
import "../css/SearchPage.css";

import { GlobalServerContext } from "../App";
import { useContext } from "react";
import displayError from "../globalFunctions/displayErrors";
import FilterBySelectBox from "../Components/Search/FilterBySelectBox";
import Loading from "../Components/PageComponents/Loading";

const Search = ({
  setHeaderPageTitle,
  favoriteProducts,
  cartProducts,
  handleAddCartProduct,
  handleRemoveCartProduct,
  handleAddFavoriteProduct,
  handleRemoveFavoriteProduct,
}) => {
  //Get Global Server Context
  const { serverUrl } = useContext(GlobalServerContext);

  //Config the page and Header title
  useEffect(() => {
    setHeaderPageTitle("Pesquisar");
  }, [setHeaderPageTitle]);

  //State that will get every search param
  const [searchParams, setSearchParams] = useSearchParams();

  //Search states
  const [searchQueryData, setSearchQueryData] = useState({
    v: "",
    methods: [
      "GRAO",
      "MOIDO",
      "CAPSULAS",
      "SOLUVEIS",
      "SACHES",
      "DRIP COFFEE",
      "COLD BREW",
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
      getAllSearchParams[key] = value.trim();
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

  //Show the content when the page is done loading
  const contentMain = useRef(null);
  useEffect(() => {
    if (!contentMain || !contentMain.current) return;
    contentMain.current.classList.add("active");
  }, [contentMain]);

  //FILTERING METHOD => Methods
  const methods = [
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
      id: "DRIP COFFEE",
      title: "Drip coffee",
      selected: true,
    },
    {
      id: "COLD BREW",
      title: "Cold Brew",
      selected: true,
    },
    {
      id: "INFUSOR",
      title: "Infusor",
      selected: true,
    },
  ];

  //FILTERING METHOD => Types
  const types = [
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
  ];

  //FILTERING METHOD => Intensities
  const intensities = [
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
  ];

  //Array that will englobe every filtering method
  const [filteringMethods, setFilteringMethods] = useState([
    {
      id: "methods",
      title: "Método",
      items: methods,
    },
    {
      id: "types",
      title: "Tipos",
      items: types,
    },
    {
      id: "intensities",
      title: "Intensidade",
      items: intensities,
    },
  ]);

  useEffect(() => {
    setFilteringMethods((currentValue) => {
      return currentValue.map((method) => {
        return {
          ...method,
          items: method.items.map((item) => {
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

  //Function that will be triggered when the user clicks in an option
  const handleItemClick = (title, methodId) => {
    setFilteringMethods((currentValue) => {
      return currentValue.map((method) => {
        if (method.id !== methodId) return method;
        return {
          ...method,
          items: method.items.map((item) => {
            if (item.title !== title) return item;
            return {
              ...item,
              selected: !item.selected,
            };
          }),
        };
      });
    });
  };

  //Function to return properly every Filter Method according to the state data
  const returnFilteringMethods = () => {
    return filteringMethods.map((filterMethod) => {
      return (
        <FilterMethod key={filterMethod.title} title={filterMethod.title}>
          {filterMethod.items.map((item) => {
            return (
              <FilterItem
                key={item.title}
                itemTitle={item.title}
                itemSelected={item.selected}
                methodType={filterMethod.id}
                handleItemClick={handleItemClick}
              />
            );
          })}
        </FilterMethod>
      );
    });
  };

  //Function to return properly every single product from the Products state
  const returnProducts = () => {
    if (products.length === 0) {
      return <Loading />;
    }
    if (products.message) {
      return <p className="callback-message">{products.message}</p>;
    }
    return products.map((product) => {
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
          handleAddFavoriteProduct={handleAddFavoriteProduct}
          handleRemoveFavoriteProduct={handleRemoveFavoriteProduct}
          cartProducts={cartProducts}
          customStyle={{
            width: "fit-content",
            maxWidth: "200px",
            margin: "2vh",
          }}
        />
      );
    });
  };

  return (
    <section ref={contentMain} className="conteudo conteudo-search">
      <main className="config_area">
        <h2 className="filtrar">Filtrar Por:</h2>
        {returnFilteringMethods()}
        <FilterMethod title="Preço">
          <div className="inputs_price">
            <input type="text" placeholder="Min." className="input_price" />
            <input type="text" placeholder="Max." className="input_price" />
          </div>
          <input type="button" className="aplicar" value="Aplicar" />
        </FilterMethod>
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
          {returnProducts()}

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
