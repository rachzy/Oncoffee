import React, { useState, useEffect, useRef } from "react";

const AutocompleteValue = ({
  id,
  value,
  setAutocompleteShow,
  setInputValue,
}) => {
  //Define the loadingState as "isLoading: true"
  function intialLoadingState() {
    return { isLoading: true };
  }

  //Create a state that will check if the page is still loading
  const [loadingState, setLoadingState] = useState(intialLoadingState());

  const getAnchor = useRef(null);

  //Sets the loading state value for the "input" reference, to show that it's already loaded
  //and it can be used by the script
  useEffect(() => {
    setLoadingState(getAnchor);
  }, []);

  //Function that will be executed after the page is completely loaded
  function afterLoadFunction() {
    getAnchor.current.addEventListener("click", function (e) {
      //Get the text value of the element that was clicked
      const getAutocompleteValue = e.path[0].innerText;

      //Set the "search-input" value as the element innerText
      document.querySelector("#search-input").value = getAutocompleteValue;

      //Set the "inputValue" state
      setInputValue({
        value: getAutocompleteValue,
      });

      //Set the "autocompleteShow" state to make it show only the single element that was clicked
      setAutocompleteShow([
        {
          searchId: "selected",
          searchValue: getAutocompleteValue,
        },
      ]);
    });
  }

  //When loading is over, execute "afterLoadFunction"
  if (loadingState.isLoading !== true) {
    afterLoadFunction();
  }

  return (
    <li>
      <a ref={getAnchor} href="#top" id={id}>
        {value}
      </a>
    </li>
  );
};

export default AutocompleteValue;
