import React, { useState, useRef, useEffect } from "react";

import Loading from "./Loading";

const ContentMobile = ({ serverStatus, children }) => {
  //State to define if the page is completely loaded or not. If it's empty, that means that it's still loading
  const [loadingState, setLoadingState] = useState();
  const contentMobile = useRef(null); //Get the conteudoMobile element

  //Set contentMobile as the state value
  useEffect(() => {
    setLoadingState(contentMobile);
  }, [setLoadingState]);

  //Function that will return the elements inside of "conteudoMobile"
  let returnElementsIfContentIsLoaded = () => {
    //Default value
    return null;
  };

  //Function that will define the value of "returnElementIfContentIsLoaded"
  function defineFinalReturn() {
    //If the server status is not "OK" or if the loadingState is undefined, don't execute anything
    if (serverStatus !== 200 || !loadingState) return;

    //If the state is not null, that means that "conteudoMobile" is completely loaded
    const getContentStyle = getComputedStyle(contentMobile.current); //get all the CSS from the class "conteudo"
  
    //If it's display is "none", it means that the user is accessing the website through a dispositive
    //that doesn't need to show the content for mobile, so, keep the function as default
    if (getContentStyle.display === "none") return;
    
    //If it's display is not none, it means that the dispositive that the user is using to access the
    // website needs to render the "conteudomobile"
    returnElementsIfContentIsLoaded = () => {
      var checkIfSlideIsLoaded = setInterval(function () {
        const mainSlideMobile = document.querySelector(".slide3");
        const loader = document.querySelector("#loader-mobile");

        if (!mainSlideMobile) return;
        contentMobile.current.classList.add("active");
        loader.style.display = "none";
        clearInterval(checkIfSlideIsLoaded);
      }, 500);
      return <>{children}</>;
    };
  }
  defineFinalReturn();
  return (
    <>
      <Loading id="loader-mobile" />
      <main ref={contentMobile} className="conteudomobile active">
        {returnElementsIfContentIsLoaded()}
      </main>
    </>
  );
};

export default ContentMobile;
