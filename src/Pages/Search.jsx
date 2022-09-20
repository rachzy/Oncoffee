import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Product from "../Components/Index/ContentPc/Midcenter/ProductSection/Product";
import FilterItem from "../Components/Search/FilterItem";
import FilterMethod from "../Components/Search/FilterMethod";
import "../css/SearchPage.css";

const Search = ({ setHeaderPageTitle }) => {
  //Config the page and Header title
  useEffect(() => {
    setHeaderPageTitle("Pesquisar");
  }, [setHeaderPageTitle]);

  const [searchParams, setSearchParams] = useSearchParams();

  //Search states
  const [searchQueryData, setSearchQueryData] = useState({
    v: "",
    methods: [],
    types: [],
  });

  useEffect(() => {
    const getAllSearchParams = {};
    searchParams.forEach((value, key) => {
      getAllSearchParams[key] = value;
    });
    setSearchQueryData(getAllSearchParams);
  }, [searchParams]);

  //Show the content when the page is done loading
  const contentMain = useRef(null);
  useEffect(() => {
    if (!contentMain || !contentMain.current) return;
    contentMain.current.classList.add("active");
  }, [contentMain]);

  //FILTERING METHOD => Methods
  const methods = [
    {
      title: "Grão",
    },
    {
      title: "Moído",
    },
    {
      title: "Cápsulas",
    },
    {
      title: "Solúveis",
    },
    {
      title: "Sachês",
    },
    {
      title: "Drip coffee",
    },
    {
      title: "Cold Brew",
    },
    {
      title: "Infusor",
    },
  ];

  //FILTERING METHOD => Types
  const types = [
    {
      title: "Aromatizado",
    },
    {
      title: "Orgânicos",
    },
    {
      title: "Microlote",
    },
    {
      title: "Descafeinados",
    },
  ];

  //FILTERING METHOD => Intensities
  const intensities = [
    {
      title: "Suave",
    },
    {
      title: "Média",
    },
    {
      title: "Intensa",
    },
  ];

  //Array that will englobe every filtering method
  const filteringMethods = [
    {
      title: "Método",
      items: methods,
    },
    {
      title: "Tipos",
      items: types,
    },
    {
      title: "Intensidade",
      items: intensities,
    },
  ];

  const returnFilteringMethods = () => {
    return filteringMethods.map((filterMethod) => {
      return (
        <FilterMethod key={filterMethod.title} title={filterMethod.title}>
          {filterMethod.items.map((item) => {
            return <FilterItem key={item.title} methodTitle={item.title} />;
          })}
        </FilterMethod>
      );
    });
  };

  return (
    <section ref={contentMain} className="conteudo-search">
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

        <section className="metodo">
          <h2>Preço</h2>
        </section>
      </main>

      <main className="bigline">
        <div className="bigline_child"></div>
      </main>

      <main className="product_area">
        <main className="top_info">
          <h2>
            Resultados de busca para <span>"{searchQueryData.v}"</span>
          </h2>
          <div className="SelectBox">
            <select>
              <option>Mais Comprado</option>
              <option>Mais Barato</option>
              <option>Mais Caro</option>
              <option>Melhor Avaliação</option>
            </select>
            <div className="chevron">
              <i className="fas fa-sort-down"></i>
            </div>
          </div>
        </main>
        <main className="products">
          <Product
            productId={123}
            productName="Teste"
            productImage={"cafegourmet.png"}
            productTotalSales={123}
            productGrade={2.5}
            productFinalPrice={123.32}
            productDescription="Lorem ipsum bla bla bla"
            productDiscount={20}
            favoriteProducts={[]}
            cartProducts={[]}
            handleAddCartProduct={() => {}}
            handleAddFavoriteProduct={() => {}}
            handleRemoveCartProduct={() => {}}
            handleRemoveFavoriteProduct={() => {}}
            customStyle={{ width: "fit-content", margin: "2vh" }}
          />
          <Product
            productId={123}
            productName="Teste"
            productImage={"cafegourmet.png"}
            productTotalSales={123}
            productGrade={2.5}
            productFinalPrice={123.32}
            productDescription="Lorem ipsum bla bla bla"
            productDiscount={20}
            favoriteProducts={[]}
            cartProducts={[]}
            handleAddCartProduct={() => {}}
            handleAddFavoriteProduct={() => {}}
            handleRemoveCartProduct={() => {}}
            handleRemoveFavoriteProduct={() => {}}
            customStyle={{ width: "fit-content", margin: "2vh" }}
          />
          <Product
            productId={123}
            productName="Teste"
            productImage={"cafegourmet.png"}
            productTotalSales={123}
            productGrade={2.5}
            productFinalPrice={123.32}
            productDescription="Lorem ipsum bla bla bla"
            productDiscount={20}
            favoriteProducts={[]}
            cartProducts={[]}
            handleAddCartProduct={() => {}}
            handleAddFavoriteProduct={() => {}}
            handleRemoveCartProduct={() => {}}
            handleRemoveFavoriteProduct={() => {}}
            customStyle={{ width: "fit-content", margin: "2vh" }}
          />
          <Product
            productId={123}
            productName="Teste"
            productImage={"cafegourmet.png"}
            productTotalSales={123}
            productGrade={2.5}
            productFinalPrice={123.32}
            productDescription="Lorem ipsum bla bla bla"
            productDiscount={20}
            favoriteProducts={[]}
            cartProducts={[]}
            handleAddCartProduct={() => {}}
            handleAddFavoriteProduct={() => {}}
            handleRemoveCartProduct={() => {}}
            handleRemoveFavoriteProduct={() => {}}
            customStyle={{ width: "fit-content", margin: "2vh" }}
          />
          <Product
            productId={123}
            productName="Teste"
            productImage={"cafegourmet.png"}
            productTotalSales={123}
            productGrade={2.5}
            productFinalPrice={123.32}
            productDescription="Lorem ipsum bla bla bla"
            productDiscount={20}
            favoriteProducts={[]}
            cartProducts={[]}
            handleAddCartProduct={() => {}}
            handleAddFavoriteProduct={() => {}}
            handleRemoveCartProduct={() => {}}
            handleRemoveFavoriteProduct={() => {}}
            customStyle={{ width: "fit-content", margin: "2vh" }}
          />
          <Product
            productId={123}
            productName="Teste"
            productImage={"cafegourmet.png"}
            productTotalSales={123}
            productGrade={2.5}
            productFinalPrice={123.32}
            productDescription="Lorem ipsum bla bla bla"
            productDiscount={20}
            favoriteProducts={[]}
            cartProducts={[]}
            handleAddCartProduct={() => {}}
            handleAddFavoriteProduct={() => {}}
            handleRemoveCartProduct={() => {}}
            handleRemoveFavoriteProduct={() => {}}
            customStyle={{ width: "fit-content", margin: "2vh" }}
          />
          <Product
            productId={123}
            productName="Teste"
            productImage={"cafegourmet.png"}
            productTotalSales={123}
            productGrade={2.5}
            productFinalPrice={123.32}
            productDescription="Lorem ipsum bla bla bla"
            productDiscount={20}
            favoriteProducts={[]}
            cartProducts={[]}
            handleAddCartProduct={() => {}}
            handleAddFavoriteProduct={() => {}}
            handleRemoveCartProduct={() => {}}
            handleRemoveFavoriteProduct={() => {}}
            customStyle={{ width: "fit-content", margin: "2vh" }}
          />
          <Product
            productId={123}
            productName="Teste"
            productImage={"cafegourmet.png"}
            productTotalSales={123}
            productGrade={2.5}
            productFinalPrice={123.32}
            productDescription="Lorem ipsum bla bla bla"
            productDiscount={20}
            favoriteProducts={[]}
            cartProducts={[]}
            handleAddCartProduct={() => {}}
            handleAddFavoriteProduct={() => {}}
            handleRemoveCartProduct={() => {}}
            handleRemoveFavoriteProduct={() => {}}
            customStyle={{ width: "fit-content", margin: "2vh" }}
          />

          <div className="produto_box">
            <div className="produto_desconto">
              <h3>55%</h3>
              <h3>OFF</h3>
            </div>
            <div className="produto_favorito">
              <input type="checkbox" id="favproduct" />
              <label htmlFor="favproduct">
                <img width={25} src={require("../imgs/newhearth.png")} alt="" />
              </label>
            </div>
            <div className="produto_img">
              <img src={require("../imgs/cafegourmet.png")} alt="" />
            </div>
            <div className="produto_text1">
              <h2 className="nome">Nome Exemplo</h2>
              <h3 className="preco">R$999,99</h3>
            </div>
            <div className="produto_text2">
              <p>
                O café tem notas de chocolate com canela, uma torra clara
                achocolatada, Alta Qualidade.{" "}
                <a className="readmore" href="#">
                  Ler Mais...
                </a>
              </p>
              <div className="avaliacao">
                <div className="nota">
                  <i className="far fa-star"></i>
                  <p>4,9</p>
                </div>
                <div className="quant_venda">
                  <p>900 Vendidos</p>
                </div>
              </div>
            </div>

            <a href="#" className="comprar">
              Comprar
            </a>
          </div>

          <div className="load_btt">
            <input type="button" value="Carregar Mais" className="load_more" />
          </div>
        </main>
      </main>
    </section>
  );
};

export default Search;
