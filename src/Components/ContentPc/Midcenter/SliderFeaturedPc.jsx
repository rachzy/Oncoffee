import React, { useEffect, useState, useRef } from "react";

import Axios from "axios";

import displayError from "../../../globalFunctions/displayErrors";

import SlideFeaturedPc from "./SliderFeaturedPc/SlideFeaturedPc";
import SlideIconFeaturedPc from "./SliderFeaturedPc/SlideIconFeaturedPc";

//Slider 1.0 for OnCoffee
//Developed by r4ch
const SliderFeaturedPc = () => {
  //Set elements constants through refs
  const slider = useRef(null);
  const nextBtn = useRef(null);
  const prevBtn = useRef(null);

  function initialState() {
    return { isLoading: true };
  }
  //State to store all the slide images
  const [adSlides, setAdSlides] = useState([initialState()]);

  //Get server Url (Ex: "http://localhost:3001")
  const { serverUrl } = require("../../../connection.json");

  //useEffect function to set the state of the slides
  useEffect(() => {
    const fetchImgs = async () => {
      const { data } = await Axios.get(`${serverUrl}/getslides/featuredpromotions`);
      if (data.isError) {
        displayError(data.errorCode, data.errno);
        return;
      }
      setAdSlides(data);
      startSlider(); //After the adSlides state have been set, starts the slider
    };
    fetchImgs();
  }, [serverUrl]);

  //Function to make the slider starts running
  function startSlider() {
    const slides = document.querySelectorAll(".slide");
    const slideIcons = document.querySelectorAll(".slide-icon");
    let slideNumber = 0; //String that will determine which slide will be the active one through it's number

    //When set as true, the slides won't be allowed to change
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
    <main className="slider2_center">
      <div className="slider2_center_text">
        <h2>Promoções Relampago</h2>
      </div>
      <div ref={slider} className="slider2">
        {adSlides.map((slide) => {
          if(slide.isLoading) return null;
          if (slide === adSlides[0]) {
            return (
              <SlideFeaturedPc
                key={slide.productId}
                slideClass="slide2 active"
                name={slide.productName}
                description={slide.productDescription}
                imgSrc={slide.productImgSrc}
                imgAlt={slide.productImgAlt}
                discountPercentage={slide.productDiscount}
                realPrice={slide.productFinalPrice}
                hrefPage={`product/${slide.productId}`}
                typeClass={slide.slideTypeClass}
                endDate={slide.slideEndDate}
              />
            );
          }
          return (
            <SlideFeaturedPc
              key={slide.productId}
              slideClass="slide2"
              name={slide.productName}
              description={slide.productDescription}
              imgSrc={slide.productImgSrc}
              imgAlt={slide.productImgAlt}
              discountPercentage={slide.productDiscount}
              realPrice={slide.productFinalPrice}
              hrefPage={`product/${slide.productId}`}
              typeClass={slide.slideTypeClass}
              endDate={slide.slideEndDate}
            />
          );
        })}
        <div className="navigation2">
          <i ref={prevBtn} className="fas fa-chevron-left prev-btn2"></i>
          <i ref={nextBtn} className="fas fa-chevron-right next-btn2"></i>
        </div>
        <div className="navigation2-visibility">
          {adSlides.map((slide) => {
            if (slide.isLoading) return null;
            if (slide === adSlides[0]) {
              return (
                <SlideIconFeaturedPc
                  key={slide.productId}
                  className="slide-icon2 active"
                />
              );
            }
            return <SlideIconFeaturedPc key={slide.productId} className="slide-icon2" />;
          })}
        </div>
      </div>
    </main>
  );
};

export default SliderFeaturedPc;
