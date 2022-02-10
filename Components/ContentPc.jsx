import React, { useEffect, useRef, useState } from "react";

import Loading from "./Loading";

const ContentPc = ({ children }) => {
  //State to define if the page is completely loaded or not. If it's empty, that means that it's still loading
  const [loadingState, setLoadingState] = useState();
  const contentPc = useRef(null); //Get the ContentPc element

  //Set contentPc as the state value
  useEffect(() => {
    setLoadingState(contentPc);
  }, [setLoadingState]);

  //State to control if the elements inside of "ContentPC are already loaded"
  const [loadingElementsState, setLoadingElementsState] = useState();

  //Function that will return the elements inside of "contentPc"
  let returnElementsIfContentIsLoaded = () => {
    //Default value
    return null;
  };

  //Function that will define the value of "returnElementIfContentIsLoaded"
  function defineFinalReturn() {
    if (loadingState) {
      //If the state is not null, that means that "contentPc" is completely loaded
      const getContentStyle = getComputedStyle(contentPc.current); //get all the CSS from the class "conteudo"

      //If it's display is "none", it means that the user is accessing the website through a dispositive
      //that doesn't need to show the content for PC, so, keep the function as default
      if (getContentStyle.display === "none") return;

      //If it's display is not none, it means that the dispositive that the user is using to access the
      // website needs to render the "contentPC"
      returnElementsIfContentIsLoaded = () => {
        var checkIfSlideIsLoaded = setInterval(function() {
          const mainSlidePC = document.querySelector(".slide");
          const loader = document.querySelector("#loader-pc");

          if(!mainSlidePC || mainSlidePC === undefined) return;
          contentPc.current.classList.add("active");
          loader.style.display = 'none';
          clearInterval(checkIfSlideIsLoaded);
        }, 500);
        return(
          <>{children}</>
        )
      //   let slideActivePC = document.querySelector(".slide");
      //   //Function to make the page appear just when a slide on the slider is loaded
      //   var checkIfSliderIsLoaded = setInterval(function () {
      //     if (!contentPc || !contentPc.current) return;
      //     if (!slideActivePC) {
      //       slideActivePC = document.querySelector(".slide");
      //       contentPc.current.classList.add("active");
      //     }
      //     contentPc.current.classList.remove("active");
      //     document.querySelector("#loader").style.display = "none";
      //     setLoadingElementsState(slideActivePC);
      //     setTimeout(function () {
      //       contentPc.current.classList.add("active");
      //       document.querySelector("#loaded-main").style.display = "block";
      //     }, 500);
      //     clearInterval(checkIfSliderIsLoaded);
      //   }, 200);
      //   //Gets {children} and returns it if "loadingElementsState" is not undefined. Children contains all the elements that need to be rendered on
      //   //"ConteudoMobile"
      //   console.log(loadingElementsState);
      //   return (
      //     <>
      //       <main id="loaded-main" hidden>{children}</main>
      //     </>
      //   );
      }
    }
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
