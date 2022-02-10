import React, { useEffect, useState } from "react";

import Axios from "axios";

import MinasGeraisImg from "../../imgs/Minas Gerais.png";
import SaoPauloImg from "../../imgs/São Paulo.png";
import RioDeJaneiroImg from "../../imgs/Rio de Janeiro.png";
import EspiritoSantoImg from "../../imgs/Espírito Santo.png";
import ParanaImg from "../../imgs/Paraná.png";
import RondoniaImg from "../../imgs/Rondônia.png";
import BahiaImg from "../../imgs/bahia.png";

import CafeGourmetImg from "../../imgs/cafegourmet.png";
import Combo_CafesGourmetImg from "../../imgs/Combo_CafesGourmet.png";
import CapsulaDeCafeImg from "../../imgs/capsula-de-cafe-espresso-pimpinela-gourmet-tres-01.png";
import CafeteiraImg from "../../imgs/cafeteira.png";

import DatabaseLiSection from "./TopBar/DatabaseLiSection";
import ManualLilSection from "./TopBar/ManualLiSection";
import SearchBar from "./TopBar/SearchBar/SearchBar";
import displayError from "../../globalFunctions/displayErrors";

const TopBar = () => {
  const [categories, setCategories] = useState();
  const [categoriesName, setCategoriesName] = useState();

  const { serverUrl } = require("../../connection.json");

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await Axios.get(`${serverUrl}/getcategories`);
      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }
      setCategories(data);
      let allCategoryNames;
      data.map((category) => {
        if (category === data[0]) {
          return (allCategoryNames = `${category.categoryName}`);
        } else {
          return (allCategoryNames += `,${category.categoryName}`);
        }
      });
      setCategoriesName(allCategoryNames);
    };
    fetchCategories();
  }, [serverUrl]);

  function renderElementsWhenStateIsLoaded() {
    if (!categoriesName) return;
    return (
      <ul>
        <DatabaseLiSection
          className="novidades"
          category="news"
          classId="novidades_box"
          liTitles={categoriesName}
          imgSrc={CafeGourmetImg}
          imgAlt="cafegourmet-oncoffee"
          categories={categories}
          loadSubcategories={true}
        >
          Novidades
        </DatabaseLiSection>

        <DatabaseLiSection
          className="promoçoes"
          category="promotions"
          classId="promo_box"
          liTitles="Com Desconto,Combos,Frete Grátis"
          imgSrc={Combo_CafesGourmetImg}
          imgAlt="combo-cafesgourmet-oncoffee"
          categories={categories}
          loadSubcategories={false}
        >
          Promoções
        </DatabaseLiSection>

        <ManualLilSection
          className="cafes"
          title="Cafés"
          classId="cafes_box"
          imgSrc={CapsulaDeCafeImg}
          imgAlt="capsuladecafe-oncoffee"
        >
          <ul className="cafe_estado">
            <a href="/">Por Estado</a>
            <div className="cafe_estadoul">
              <li>
                <a href="/">
                  Espírito Santo{" "}
                  <img src={EspiritoSantoImg} alt="espirito-santo-flag" />
                </a>
              </li>
              <li>
                <a href="/">
                  Minas Gerais{" "}
                  <img src={MinasGeraisImg} alt="minas-gerais-flag" />
                </a>
              </li>
              <li>
                <a href="/">
                  Rio de Janeiro{" "}
                  <img src={RioDeJaneiroImg} alt="rio-de-janeiro-flag" />
                </a>
              </li>
              <li>
                <a href="/">
                  São Paulo <img src={SaoPauloImg} alt="sao-paulo-flag" />
                </a>
              </li>
              <li>
                <a href="/">
                  Paraná
                  <img src={ParanaImg} alt="paraná-flag" />
                </a>
              </li>
              <li>
                <a href="/">
                  Rondônia <img src={RondoniaImg} alt="rondônia-flag" />
                </a>
              </li>
              <li>
                <a href="/">
                  Bahia <img src={BahiaImg} alt="bahia-img" />
                </a>
              </li>
            </div>
          </ul>
          <ul>
            <a href="/">Métodos</a>
            <li>
              <a href="/">Grãos</a>
            </li>
            <li>
              <a href="/">Moídos</a>
            </li>
            <li>
              <a href="/">Cápsulas</a>
            </li>
            <li>
              <a href="/">Solúveis</a>
            </li>
            <li>
              <a href="/">Sachês</a>
            </li>
            <li>
              <a href="/">Drip Coffee</a>
            </li>
            <li>
              <a href="/">Cold Brew</a>
            </li>
            <li>
              <a href="/">Infusores</a>
            </li>
            <li>
              <a href="/">Ver Mais...</a>
            </li>
          </ul>
          <ul>
            <a className="tipos_a" href="/">
              Tipos
            </a>
            <li>
              <a href="/">Aromatizados</a>
            </li>
            <li>
              <a href="/">Orgânicos</a>
            </li>
            <li>
              <a href="/">Microlote</a>
            </li>
            <li>
              <a href="/">Descafeinado</a>
            </li>
            <a className="intenso_a" href="/">
              Intensidade
            </a>
            <li>
              <a href="/">Suave</a>
            </li>
            <li>
              <a href="/">Média</a>
            </li>
            <li>
              <a href="/">Intensa</a>
            </li>
          </ul>
        </ManualLilSection>

        <ManualLilSection
          className="cafeteiras"
          title="Cafeteiras"
          classId="cafeteiras_box"
          imgSrc={CafeteiraImg}
          imgAlt="cafeteria-oncoffee"
        >
          <ul>
            <a href="/">Espresso</a>
            <li>
              <a href="/">Maquinas para Grãos</a>
            </li>
            <li>
              <a href="/">Maquinas para Pós</a>
            </li>
            <li>
              <a href="/">Maquinas para Capsulas</a>
            </li>
            <a className="percoa" href="/">
              Percolação
            </a>
            <li>
              <a href="/">Cafeteira Globinho</a>
            </li>
            <li>
              <a href="/">Cafeteira Italiana</a>
            </li>
          </ul>
          <ul>
            <a href="/">Filtrados</a>
            <li>
              <a href="/">Prensa Francesa</a>
            </li>
            <li>
              <a href="/">Aeroexpress</a>
            </li>
            <li>
              <a href="/">Hario v60</a>
            </li>
            <li>
              <a href="/">Chemex</a>
            </li>
            <li>
              <a href="/">Eva Solo</a>
            </li>
            <li>
              <a href="/">Moka</a>
            </li>
            <li>
              <a href="/">Coador de Papel</a>
            </li>
            <li>
              <a href="/">Coador de Pano</a>
            </li>
            <li>
              <a href="/">Ver Mais...</a>
            </li>
          </ul>
        </ManualLilSection>

        <DatabaseLiSection
          className="acesso"
          classId="acesso_box"
          category="acessories"
          liTitles="Com Desconto,Combos,Frete Grátis"
          imgSrc={Combo_CafesGourmetImg}
          imgAlt="combo-cafesgourmet-oncoffee"
          categories={categories}
          loadSubcategories={true}
        >
          Acessórios
        </DatabaseLiSection>

        <DatabaseLiSection
          className="derivados"
          classId="derivados_box"
          category="derivatives"
          liTitles="Com Desconto,Combos,Frete Grátis"
          imgSrc={Combo_CafesGourmetImg}
          imgAlt="combo-cafesgourmet-oncoffee"
          categories={categories}
          loadSubcategories={true}
        >
          Derivados
        </DatabaseLiSection>
      </ul>
    );
  }

  return (
    <main className="topbar">
      <main className="consult_bar">{renderElementsWhenStateIsLoaded()}</main>
      <SearchBar />
    </main>
  );
};

export default TopBar;
