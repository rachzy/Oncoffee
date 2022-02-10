import React, { useState, useEffect, useRef } from "react";

import Axios from "axios";

import SlideMainPc from "./SliderMainPc/SlideMainPc";
import SlideIconMainPc from "./SliderMainPc/SlideIconMainPc";

import displayError from "../../globalFunctions/displayErrors";

//Slider 1.0 for OnCoffee
//Developed by r4ch
const SliderMainPc = () => {
  function intialState() {
    return { isLoading: true };
  }
  //State to store all the slide images
  const [adSlides, setAdSlides] = useState([intialState()]);

  //Get server Url (Ex: "http://localhost:3001")
  const { serverUrl } = require("../../connection.json");

  //useEffect function to set the state of the slides
  useEffect(() => {
    const fetchImgs = async () => {
      const { data } = await Axios.get(`${serverUrl}/getslides/ads`);
      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }
      setAdSlides(data);
      startSlider(); //After the adSlides state have been setted, starts the slider
    };
    fetchImgs();
  }, [serverUrl]);

  //Set elements consts through refs
  const slider = useRef(null);
  const nextBtn = useRef(null);
  const prevBtn = useRef(null);

  //Function to make the slider starts running
  function startSlider() {
    const slides = document.querySelectorAll(".slide");
    const slideIcons = document.querySelectorAll(".slide-icon");
    let slideNumber = 0; //String that will determine which slide will be the active one through it's number

    //When setted as true, the slides won't be allowed to change
    let blockSlideChange = false;

    //Function that will display the next slide
    function nextSlide() {
      if (blockSlideChange) return;
      //If the slideNumber value is already the same as the quantity of slides, return it as 0. Else, just add +1
      if (slideNumber === slides.length - 1) {
        slideNumber = 0;
      } else {
        slideNumber++;
      }

      slides.forEach((slide) => {
        //Remove the "active" classList from all slides
        slide.classList.remove("active");
      });

      //Does the same as above, but with the slideIcons
      slideIcons.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
      });

      //If this slide is the same as the one that corresponds to it's order according to "slideNumber", so that means that it's the one that need to be showed up. Then, toogle the class "active" on it
      slides[slideNumber].classList.add("active");
      slideIcons[slideNumber].classList.add("active");
    }

    //Function that will display the previous slide
    function prevSlide() {
      if (blockSlideChange) return;
      clearInterval(playSlides);
      if (slideNumber === 0) {
        slideNumber = slides.length - 1;
      } else {
        slideNumber--;
      }

      slides.forEach((slide) => {
        slide.classList.remove("active");

        if (slide === slides[slideNumber]) {
          slide.classList.add("active");
        }
      });

      slideIcons.forEach((slideIcon) => {
        slideIcon.classList.remove("active");

        if (slideIcon === slideIcons[slideNumber]) {
          slideIcon.classList.add("active");
        }
      });
    }

    //Function that will get triggered when "nextBtn" get clicked
    nextBtn.current.addEventListener("click", function () {
      blockSlideChange = false;
      nextSlide();
      setTimeout(function () {
        blockSlideChange = true;
      }, 10); //Completely blocks the slide change again
    });

    //Function that will get triggered when "prevBtn" get clicked
    prevBtn.current.addEventListener("click", function () {
      blockSlideChange = false; //Completely unblocks the slide change
      prevSlide(); //Display previous slide
      setTimeout(function () {
        blockSlideChange = true;
      }, 10); //Completely blocks the slide change again
    });

    slider.current.addEventListener("mouseenter", function () {
      blockSlideChange = true;
      clearInterval(playSlides);
    });

    slider.current.addEventListener("mouseleave", function () {
      blockSlideChange = false;
      startPlayingSlides();
    });

    //setInterval Function that will change the slide every [4] seconds
    var playSlides;
    var startPlayingSlides = () => {
      playSlides = setInterval(nextSlide, 4000);
    };
    startPlayingSlides();
  }
  return (
    <main className="slider_center">
      <div ref={slider} className="slider">
        {adSlides.map((slide) => {
          if (slide.isLoading) return null;
          if (adSlides[0] === slide) {
            return (
              <SlideMainPc
                key={slide.id}
                className="slide active"
                imgSrc={slide.imgSrc}
                imgAlt={slide.imgAlt}
              />
            );
          }
          return (
            <SlideMainPc
              key={slide.id}
              className="slide"
              imgSrc={slide.imgSrc}
              imgAlt={slide.imgAlt}
            />
          );
        })}
        <div className="navigation">
          <i ref={prevBtn} className="fas fa-chevron-left prev-btn"></i>
          <i ref={nextBtn} className="fas fa-chevron-right next-btn"></i>
        </div>
        <div className="navigation-visibility">
          {adSlides.map((slide) => {
            if (slide.isLoading) return null;
            if (adSlides[0] === slide) {
              return <SlideIconMainPc key={slide.id} className="slide-icon active" />;
            }
            return <SlideIconMainPc key={slide.id} className="slide-icon" />;
          })}
        </div>
      </div>
    </main>
  );
};

export default SliderMainPc;
