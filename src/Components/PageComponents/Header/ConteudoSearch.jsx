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

  //Function to set the inital value and structure of the "InputSearchProductValue" state
  function initialState() {
    return { searchValue: "" };
  }

  //State that will save the value of the input for searching Products
  const [InputSearchProductValue, setInputSearchProductValue] = useState(
    initialState()
  );
  //State that will control exactly what will be displayed on the "autocomplete" div
  const [autocompleteShow, setAutocompleteShow] = useState([]);
  //State to set the "autocomplete" values
  const [autocompleteData, setAutocompleteData] = useState([]);

  //Function that will set the "InputSearchProductValue" state every time that the input get changed
  const handleInputProductChange = async (e) => {
    const { value, name } = e.target;
    setInputSearchProductValue({
      [name]: value,
    });

    if (value === "") {
      setAutocompleteShow(autocompleteData);
      return;
    }

    if (
      !InputSearchProductValue.searchValue ||
      InputSearchProductValue.searchValue === ""
    )
      return;

    //Get all the search results according to what the user typed from the database
    try {
      const { data } = await Axios.get(
        `${serverUrl}/getproductsforsearches/${InputSearchProductValue.searchValue}`
      );

      if (data.isError) return displayError(data.errorCode, data.errno);

      let finalProductsReturn;
      if (data.length === 0) {
        setAutocompleteShow([
          {
            searchId: InputSearchProductValue.searchValue,
            searchValue: InputSearchProductValue.searchValue,
            notRecent: true,
          },
        ]);
        return;
      }
      data.map((d) => {
        if (!d || d.productName === "") return null;
        if (finalProductsReturn) {
          finalProductsReturn = [
            ...finalProductsReturn,
            {
              searchId: d.productId,
              searchValue: d.productName,
              notRecent: true,
            },
          ];
        } else {
          finalProductsReturn = [
            {
              searchId: d.productId,
              searchValue: d.productName,
              notRecent: true,
            },
          ];
        }
        return finalProductsReturn;
      });
  
      if (!finalProductsReturn || finalProductsReturn === "") return;
  
      //Set the final state value
      setAutocompleteShow(finalProductsReturn);
    } catch (err) {
      displayError(err.message, "COULDNT_GET_INPUT_SEARCHES");
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
        const { data } = await Axios.get(`${serverUrl}/user/getusersearches/`);

        if (data.isError) return displayError(data.errorCode, data.errno);

        setAutocompleteData(data);
        setAutocompleteShow(data);
      } catch (err) {
        displayError(err.message, "COULDNT_FETCH_SEARCHES");
      }
    };
    setTimeout(fetchNewSearches, 1000);
  };

  //Function that will post the "InputSearchProductValue" to the server and redirect the user to the
  //Search page when the "SearchIcon" get clicked
  const handleInputProductEnterKeyPress = (e) => {
    if (e.key !== "Enter") return;
    if (
      !InputSearchProductValue.searchValue ||
      InputSearchProductValue.searchValue === ""
    )
      return;

    navigate(`/search/${InputSearchProductValue.searchValue}`);
    contentSearch.current.classList.remove("active");

    postInputSearchProductValue(InputSearchProductValue.searchValue);
  };

  useEffect(() => {
    const fetchSearches = async () => {
      if (!isLogged) return;

      try {
        const { data } = await Axios.get(`${serverUrl}/getusersearches`);

        if (data.isError) displayError(data.errorCode, data.errno);

        setAutocompleteData(data);
        setAutocompleteShow(data);
      } catch (err) {
        return displayError(err.message, "COULDNT_FETCH_SEARCHES");
      }
    };
    fetchSearches();
  }, [serverUrl, displayError, isLogged]);

  //State that will save the value of the input for searching Categories
  const [InputSearchCategoryValue, setInputCategoryValue] = useState(
    initialState()
  );

  const handleInputCategoryChange = async (e) => {
    const { value, name } = e.target;
    setInputCategoryValue({
      [name]: value,
    });

    if (!value || value === "") return setCategoriesShow(categoriesData);

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
        const differencePercentage = similarity(inputValue, categoryName) * -1;
        if (differencePercentage < 20) return category;
        if (categoryName.startsWith(inputValue)) return category;
        return undefined;
      }
    );

    setCategoriesShow(getSimilarProductsAccordingToInputValue);
  };

  const [categoriesData, setCategoriesData] = useState();
  const [categoriesShow, setCategoriesShow] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await Axios.get(`${serverUrl}/getcategories/`);

        if (data.isError) return displayError(data.errorCode, data.errno);

        setCategoriesData(data);
        setCategoriesShow(data);
      } catch (err) {
        displayError(err.message, "COULDNT_FETCH_CATEGORIES");
      }
    };
    fetchCategories();
  }, [serverUrl, displayError]);

  return (
    <main ref={contentSearch} id="content-search" className="conteudosearch">
      <InputSearchSection className="input-search">
        <InputSearchMobile
          type="text"
          name="searchValue"
          placeholder="Buscar um produto..."
          value={InputSearchProductValue.searchValue}
          onChange={handleInputProductChange}
          onKeyPress={handleInputProductEnterKeyPress}
        />
      </InputSearchSection>
      <AutocompleteSectionMobile
        autocompleteShow={autocompleteShow}
        setInputValue={setInputSearchProductValue}
        postInputSearchProductValue={postInputSearchProductValue}
      />

      <RecommendedSection />

      <div className="categotext">
        <h2>Categorias</h2>
      </div>

      <InputSearchSection className="input-search2">
        <InputSearchMobile
          type="text"
          name="searchValue"
          placeholder="Buscar uma categoria..."
          onChange={handleInputCategoryChange}
          value={InputSearchCategoryValue.searchValue}
        />
      </InputSearchSection>

      <Categories categoriesShow={categoriesShow} />
    </main>
  );
};

export default ConteudoSearch;
