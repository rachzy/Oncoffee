import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../../../css/Search.css";

import Axios from "axios";

import similarity from "../../../globalFunctions/similarity";

import InputSearchMobile from "./ConteudoSearch/InputSearchSection/InputSearchMobile";
import AutocompleteSectionMobile from "./ConteudoSearch/AutocompleteSectionMobile";
import RecommendedSection from "./ConteudoSearch/RecommendedSection";
import InputSearchSection from "./ConteudoSearch/InputSearchSection";
import Categories from "./ConteudoSearch/Categories";

import { GlobalServerContext } from "../../../App";

const ConteudoSearch = () => {
  //Get "serverUrl" from "connection.json";
  const { serverUrl, displayError, isLogged } = useContext(GlobalServerContext);

  //Get "useNavigate" from React (to use it for redirects)
  const navigate = useNavigate();

  const contentSearch = useRef(null);

  //Autocomplete states
  const [autocompleteShow, setAutocompleteShow] = useState([]);
  const [autocompleteData, setAutocompleteData] = useState([]);

  //Categories states
  const [categoriesData, setCategoriesData] = useState([]);
  const [categoriesShow, setCategoriesShow] = useState([]);

  useEffect(() => {
    const fetchSearches = async () => {
      if (!isLogged) return;

      try {
        const { data } = await Axios.get(`${serverUrl}/user/getsearches`);

        if (data.isError) displayError(data.errorCode, data.errno);

        setAutocompleteData(data);
        setAutocompleteShow(data);
      } catch (err) {
        return displayError(err.message, "COULDNT_FETCH_SEARCHES");
      }
    };
    fetchSearches();

    const fetchCategories = async () => {
      try {
        const { data } = await Axios.get(`${serverUrl}/categories/get`);

        if (data.isError) return displayError(data.errorCode, data.errno);

        setCategoriesData(data);
        setCategoriesShow(data);
      } catch (err) {
        displayError(err.message, "COULDNT_FETCH_CATEGORIES");
      }
    };
    fetchCategories();
  }, [serverUrl, displayError, isLogged]);

  const [inputValues, setInputValues] = useState({
    product: "",
    category: "",
  });

  const [debounce, setDebounce] = useState(); //Debounce to delay server queries
  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });

    if (!value) return;

    //Set the "InputSearchProductValue" state every time that the input get changed
    if (name === "product") {
      clearTimeout(debounce);
      return setDebounce(
        setTimeout(async () => {
          try {
            const { data } = await Axios.get(
              `${serverUrl}/products/getsearches/${value}`
            );

            if (data.isError) return displayError(data.errorCode, data.errno);

            let finalProductsReturn;

            if (data.length === 0) {
              return setAutocompleteShow([
                {
                  searchId: value,
                  searchValue: value,
                  notRecent: true,
                },
              ]);
            }

            data.forEach((d) => {
              if (!d) return null;
              if (finalProductsReturn) {
                return (finalProductsReturn = [
                  ...finalProductsReturn,
                  {
                    searchId: d.productId,
                    searchValue: d.productTitle,
                    notRecent: true,
                  },
                ]);
              }
              finalProductsReturn = [
                {
                  searchId: d.productId,
                  searchValue: d.productTitle,
                  notRecent: true,
                },
              ];
            });

            if (!finalProductsReturn) return;

            //Set the final state value
            setAutocompleteShow(finalProductsReturn);
          } catch (err) {
            displayError(err.message, "COULDNT_GET_INPUT_SEARCHES");
          }
        }, 400)
      );
    }

    if (name === "category") {
      const getSimilarProductsAccordingToInputValue = categoriesData.map(
        (category) => {
          const inputValue = value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          const categoryName = category.categoryName
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          const differencePercentage =
            similarity(inputValue, categoryName) * -1;
          if (differencePercentage < 20) return category;
          if (categoryName.startsWith(inputValue)) return category;
          return undefined;
        }
      );

      setCategoriesShow(getSimilarProductsAccordingToInputValue);
    }
  };

  //Post user search on the database
  const postInputSearchProductValue = (searchValue) => {
    const postData = async () => {
      try {
        const { data } = await Axios.post(`${serverUrl}/user/postsearch`, {
          searchValue: searchValue,
        });

        if (data.isError) {
          displayError(data.errorCode, data.errno);
        }
      } catch (err) {
        displayError(err.message, "COULDNT_POST_SEARCH");
      }
    };
    postData();

    //Get new data after insert
    const fetchNewSearches = async () => {
      if (!isLogged) return;

      try {
        const { data } = await Axios.get(`${serverUrl}/user/getsearches/`);

        if (data.isError) return displayError(data.errorCode, data.errno);

        setAutocompleteData(data);
        setAutocompleteShow(data);
      } catch (err) {
        displayError(err.message, "COULDNT_FETCH_SEARCHES");
      }
    };
    setTimeout(fetchNewSearches, 1000);
  };

  const handleInputKeyPress = (e) => {
    if (e.key !== "Enter") return;
    const { name } = e.target;

    if (!inputValues[name]) return;

    if (name === "products") {
      navigate(`/search/${inputValues.product}`);
      contentSearch.current.classList.remove("active");
      return postInputSearchProductValue(inputValues.product);
    }
  };

  return (
    <main ref={contentSearch} id="content-search" className="conteudosearch">
      <InputSearchSection className="input-search">
        <InputSearchMobile
          type="text"
          name="product"
          placeholder="Buscar um produto..."
          value={inputValues.product}
          onChange={handleInputsChange}
          onKeyPress={handleInputKeyPress}
        />
      </InputSearchSection>
      <AutocompleteSectionMobile
        autocompleteShow={autocompleteShow}
        setInputValue={setInputValues}
        postInputSearchProductValue={postInputSearchProductValue}
      />

      <RecommendedSection />

      <div className="categotext">
        <h2>Categorias</h2>
      </div>

      <InputSearchSection className="input-search2">
        <InputSearchMobile
          type="text"
          name="category"
          placeholder="Buscar uma categoria..."
          onChange={handleInputsChange}
          value={inputValues.category}
        />
      </InputSearchSection>

      <Categories categoriesShow={categoriesShow} />
    </main>
  );
};

export default ConteudoSearch;
