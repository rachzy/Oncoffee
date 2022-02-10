import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";

import displayError from "../../../../globalFunctions/displayErrors";
import getCookie from "../../../../globalFunctions/getCookie";
import similarity from "../../../../globalFunctions/similarity";

import Input from "./Input";
import SearchIcon from "./SearchIcon";
import Autocomplete from "./Autocomplete";

const SearchBar = () => {
  //Get "serverUrl" from "connection.json";
  const { serverUrl } = require("../../../../connection.json");

  //Get "useNavigate" from React (to use it for redirects)
  const navigate = useNavigate();

  //Function to set the inital value and structure of the "inputValue" state
  function initialState() {
    return { value: "" };
  }

  //State that will control exactly what will be displayed on the "autocomplete" div
  const [autocompleteShow, setAutocompleteShow] = useState([]);

  //State to set the "autocomplete" values
  const [autocompleteData, setAutocompleteData] = useState([]);

  //State that will save the value of the search input
  const [inputValue, setInputValue] = useState(initialState());

  //Function that will set the "inputValue" state every time that the input get changed
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setInputValue({
      [name]: value,
    });

    //If the input is empty, don't show anything on the autocomplete
    if (value === "") {
      setAutocompleteShow(autocompleteData);
      return;
    }

    if (!inputValue.value || inputValue.value === "") return;

    //Get all the search results according to what the user typed from the database
    const { data } = await Axios.get(
      `${serverUrl}/getproductsforsearches/${value}`
    );
    if (data.isError) {
      displayError(data.errorCode, data.errno);
    } else {
      if(data.length === 0) {
        setAutocompleteShow([{
          searchId: "none",
          searchValue: value
        }]);
        return;
      }
      let finalProductsReturn;
      data.map((d) => {
        if (finalProductsReturn) {
          finalProductsReturn = [
            ...finalProductsReturn,
            {
              searchId: d.productId,
              searchValue: d.productName,
            },
          ];
        } else {
          finalProductsReturn = [
            {
              searchId: d.productId,
              searchValue: d.productName,
            },
          ];
        }
        return finalProductsReturn;
      });

      if (!finalProductsReturn || finalProductsReturn === "") return;

      //Set the final state value
      setAutocompleteShow(finalProductsReturn);
    }
  };

  //Function that will post the "inputValue" to the server and redirect the user to the
  //Search page when the "SearchIcon" get clicked
  const handleSearchIconClick = () => {
    const getSearchValue = inputValue.value;
    if (getSearchValue === undefined || getSearchValue === "") return;

    //Redirect the user
    navigate(`/search/${getSearchValue}`);

    //Post Data
    const postInputValue = async () => {
      const { data } = await Axios.post(`${serverUrl}/postsearch`, {
        userId: getCookie("UID"),
        searchValue: inputValue.value,
      });
      if (data.isError) {
        displayError(data.errorCode, data.errno);
      }
    };
    postInputValue();

    //Get new data after insert
    const fetchNewSearches = async () => {
      const userId = getCookie("UID");
      if (!userId) return;
      const { data } = await Axios.get(
        `${serverUrl}/getusersearches/${userId}`
      );
      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }
      setAutocompleteData(data);
      setAutocompleteShow(data);
    };
    setTimeout(fetchNewSearches, 1000);
  };

  useEffect(() => {
    //Function to set the autocomplete values according to the received data by the user ID
    const fetchData = async () => {
      const userId = getCookie("UID");
      if (!userId) return;
      const { data } = await Axios.get(
        `${serverUrl}/getusersearches/${userId}`
      );
      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }
      setAutocompleteData(data);
      setAutocompleteShow(data);
    };
    fetchData();
  }, [serverUrl]);

  return (
    <div className="input_consult">
      <Input
        id="search-input"
        type="text"
        name="value"
        value={inputValue.value}
        onChange={handleInputChange}
        placeholder="Pesquise aqui..."
      />
      <Input id="search-button" type="button" />
      <SearchIcon onClick={handleSearchIconClick} />
      <Autocomplete
        autocompleteShow={autocompleteShow}
        setInputValue={setInputValue}
        setAutocompleteShow={setAutocompleteShow}
      />
    </div>
  );
};

export default SearchBar;
