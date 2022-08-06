import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";

import Input from "./Input";
import SearchIcon from "./SearchIcon";
import Autocomplete from "./Autocomplete";

import { GlobalServerContext } from "../../../../../App";

const SearchBar = () => {
  //Get "serverUrl" from "connection.json";
  const { serverUrl, displayError, isLogged } = useContext(GlobalServerContext);

  //Get "useNavigate" from React (to use it for redirects)
  const navigate = useNavigate();

  //State that will control exactly what will be displayed on the "autocomplete" div
  const [autocompleteShow, setAutocompleteShow] = useState([]);

  //State to set the "autocomplete" values
  const [autocompleteData, setAutocompleteData] = useState([]);

  //State that will save the value of the search input
  const [inputValue, setInputValue] = useState({
    value: "",
  });

  //Function that will set the "inputValue" state every time that the input get changed
  const [debounce, setDebounce] = useState();
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setInputValue({
      [name]: value,
    });

    //If the input is empty, don't show anything on the autocomplete
    if (!value) {
      setAutocompleteShow(autocompleteData);
      return;
    }

    if (!inputValue.value) return;

    clearTimeout(debounce);
    setDebounce(
      setTimeout(async () => {
        //Get all the search results according to what the user typed from the database
        try {
          const { data } = await Axios.get(
            `${serverUrl}/products/getsearches/${value}`
          );
          if (data.isError) {
            return displayError(data.errorCode, data.errno);
          }

          if (data.length === 0) {
            setAutocompleteShow([
              {
                searchId: "none",
                searchValue: value,
              },
            ]);
            return;
          }

          let finalProductsReturn = [];
          data.forEach((d) => {
            const additionalData = {
              searchId: d.productId,
              searchValue: d.productTitle,
            };
            finalProductsReturn.push(additionalData);
          });

          //Set the final state value
          setAutocompleteShow(finalProductsReturn);
        } catch (err) {
          displayError(err.message, err.code);
        }
      }, 400)
    );
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
      const { data } = await Axios.post(
        `${serverUrl}/user/postsearch`,
        {
          searchValue: inputValue.value,
        },
        { withCredentials: true }
      );
      if (data.isError) {
        displayError(data.errorCode, data.errno);
      }
    };
    postInputValue();

    //Get new data after insert
    const fetchNewSearches = async () => {
      try {
        const { data } = await Axios.get(`${serverUrl}/user/getsearches/`);

        if (data.isError) {
          return displayError(data.errorCode, data.errno);
        }

        setAutocompleteData(data);
        setAutocompleteShow(data);
      } catch (err) {
        displayError(err.message, "CANT_GET_USER_SEARCHES");
      }
    };
    setTimeout(fetchNewSearches, 1000);
  };

  useEffect(() => {
    //Function to set the autocomplete values according to the received data by the user ID
    const fetchData = async () => {
      if (!isLogged) return;

      try {
        const { data } = await Axios.get(`${serverUrl}/user/getsearches/`, {
          withCredentials: true,
        });

        if (data.isError) {
          return displayError(data.errorCode, data.errno);
        }

        setAutocompleteData(data);
        setAutocompleteShow(data);
      } catch (err) {
        displayError(err.message, "CANT_FETCH_DATA");
      }
    };
    fetchData();
  }, [serverUrl, displayError, isLogged]);

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
