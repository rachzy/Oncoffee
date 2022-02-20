import React, { useEffect, useRef, useState } from "react";

import Axios from "axios";

import Loading from "./Loading";

const ContentPc = ({ serverStatus, children }) => {
  //State to define if the page is completely loaded or not. If it's empty, that means that it's still loading
  const [loadingState, setLoadingState] = useState();
  const contentPc = useRef(null); //Get the ContentPc element

  //Set contentPc as the state value
  useEffect(() => {
    setLoadingState(contentPc);
  }, [setLoadingState]);

  //Function that will return the elements inside of "contentPc"
  let returnElementsIfContentIsLoaded = () => {
    //Default value
    return null;
  };

  //Function that will define the value of "returnElementIfContentIsLoaded"
  function defineFinalReturn() {
    //If the server status is not "OK" or if the loadingState is undefined, don't execute anything
    if (serverStatus !== 200 || !loadingState) return;

    //If the state is not null, that means that "contentPc" is completely loaded
    const getContentStyle = getComputedStyle(contentPc.current); //get all the CSS from the class "conteudo"

    //If it's display is "none", it means that the user is accessing the website through a dispositive
    //that doesn't need to show the content for PC, so, keep the function as default
    if (getContentStyle.display === "none") return;

    //If it's display is not none, it means that the dispositive that the user is using to access the
    // website needs to render the "contentPC"
    returnElementsIfContentIsLoaded = () => {
      var checkIfSlideIsLoaded = setInterval(function () {
        const mainSlidePC = document.querySelector(".slide");
        const loader = document.querySelector("#loader-pc");

        if (!mainSlidePC) return;
        contentPc.current.classList.add("active");
        loader.style.display = "none";
        clearInterval(checkIfSlideIsLoaded);
      }, 500);
      return <>{children}</>;
    };
  }
  defineFinalReturn();
  return (
    <>
      <Loading id="loader-pc" />
      <main ref={contentPc} className="conteudo">
        {returnElementsIfContentIsLoaded()}
      </main>
    </>
  );
};

export default ContentPc;
