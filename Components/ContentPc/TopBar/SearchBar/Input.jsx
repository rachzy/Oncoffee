import React, { useEffect, useRef, useState } from "react";

const Input = ({ name, type, placeholder, value, id, onChange, onClick }) => {
  //Define the loadingState as "isLoading: true"
  function intialLoadingState() {
    return { isLoading: true };
  }

  //Create a state that will check if the page is still loading
  const [loadingState, setLoadingState] = useState(intialLoadingState());

  //Get the "input" element as a React Reference
  const input = useRef(null);

  //Sets the loading state value for the "input" reference, to show that it's already loaded
  //and it can be used by the script
  useEffect(() => {
    setLoadingState(input);
  }, []);

  function afterLoadFunction() {
    //Get elements by using "querySelector"
    const autocompleteDiv = document.querySelector(".consult_autocomplete");
    const inputConsult = document.querySelector(".input_consult");

    //If input or autocompleteDiv are "undefined", stop the execution
    if (!input || !autocompleteDiv) return;

    document.addEventListener("click", function (e) {
      //Get the element where the user clicked in
      const getPaths = e.path;

      //String that will control if the "autocompleteDiv" will be visible or not
      let checkPropagation = true;

      getPaths.forEach((path) => {
        //If the "path" has the same value as "inputConsult", that means that the user
        //clicked inside of the "inputConsult" div, so the "autocompleteDiv" needs to
        //stay visible, then return "checkPropagation" as false
        if (path === inputConsult) {
          checkPropagation = false;
        }
      });
      if (checkPropagation === false) return;

      //If "checkPropagation" is true, hide the "autocompleteDiv" element
      autocompleteDiv.style.visibility = "hidden";
    });

    input.current.addEventListener("focus", function (e) {
      //Stops propagation of any other event when the input get focused
      e.stopImmediatePropagation();
      //Makes "autocompleteDiv" gets visible
      autocompleteDiv.style.visibility = "visible";
    });

    autocompleteDiv.addEventListener("click", function (e) {
      //If the user clicked inside of the "autocompleteDiv", stop any other event
      e.stopImmediatePropagation();
    });
  }

  const handleKeyPress = (e) => {
    if(e.key === "Enter") {
      const searchIcon = document.querySelector("#label-searchicon");
      searchIcon.click();
    }
  }

  //If "isLoading" from "loadingState" isn't true, execute all the function above
  if (loadingState.isLoading !== true) {
    afterLoadFunction();
  }

  return (
    <>
      <input
        ref={input}
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onKeyPress={handleKeyPress}
        onChange={onChange}
        onClick={onClick}
        autoComplete="off"
      />
    </>
  );
};

export default Input;
