import React, { useEffect, useState, useRef, useContext } from "react";

import Axios from "axios";

import displayError from "../../../../globalFunctions/displayErrors";

import SlideFeaturedPc from "./SliderFeaturedPc/SlideFeaturedPc";
import SlideIconFeaturedPc from "./SliderFeaturedPc/SlideIconFeaturedPc";

import { GlobalServerContext } from "../../../../App";

//Slider 1.0 for OnCoffee
//Developed by r4ch
const SliderFeaturedPc = () => {
  //Set elements constants through refs
  const slider = useRef(null);
  const nextBtn = useRef(null);
  const prevBtn = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);

  //State to store all the slide images
  const [adSlides, setAdSlides] = useState([{ isLoading: true }]);

  //Get server Url (Ex: "http://localhost:3001")
  const { serverUrl } = useContext(GlobalServerContext);

  //useEffect function to set the state of the slides
  useEffect(() => {
    const fetchImgs = async () => {
      try {
        const { data } = await Axios.get(
          `${serverUrl}/ads/getslides/featuredpromotions`
        );

        if (data.isError) {
          displayError(data.errorCode, data.errno);
          return;
        }

        setAdSlides(data);
      } catch (err) {
        displayError(err, err.code);
      }
    };
    fetchImgs();
  }, [serverUrl]);

  //Function to make the slider starts running
  const startSlider = () => {
    if (!isLoaded || !adSlides || adSlides.isLoading) return;

    const slides = document.querySelectorAll(".slide2");
    const slideIcons = document.querySelectorAll(".slide-icon2");
    let slideNumber = 0; //String that will determine which slide will be the active one through it's number

    //When set as true, the slides won't be allowed to change
    let blockSlideChange = false;

    //Function that will display the next slide
    const nextSlide = () => {
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
    };

    //Function that will display the previous slide
    const prevSlide = () => {
      if (blockSlideChange) return;
      clearInterval(sliderPlayer);
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
    };

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
      clearInterval(sliderPlayer);
    });

    slider.current.addEventListener("mouseleave", function () {
      blockSlideChange = false;
      startSliderPlayer();
    });

    //setInterval Function that will change the slide every [4] seconds
    let sliderPlayer;
    const startSliderPlayer = () => {
      sliderPlayer = setInterval(nextSlide, 4000);
    };
    startSliderPlayer();
  };
  startSlider();

  return (
    <main
      onLoad={() => {
        setIsLoaded(true);
      }}
      className="slider2_center"
    >
      <div className="slider2_center_text">
        <h2>Promoções Relampago</h2>
      </div>
      <div ref={slider} className="slider2">
        {adSlides.map((slide) => {
          if (slide.isLoading) return null;

          let slideClass = "slide2";
          if (slide === adSlides[0]) {
            slideClass = `${slideClass} active`;
          }

          return (
            <SlideFeaturedPc
              key={slide.productId}
              slideClass={slideClass}
              name={slide.productTitle}
              description={slide.productDescription}
              imgSrc={slide.productImage}
              imgAlt={slide.productTitle}
              discountPercentage={slide.productPrice.discount}
              realPrice={slide.productPrice.finalPrice}
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

            let slideIconClass = "slide-icon2";
            if (adSlides[0] === slide) {
              slideIconClass = `${slideIconClass} active`;
            }

            return (
              <SlideIconFeaturedPc
                key={slide.productId}
                className={slideIconClass}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default SliderFeaturedPc;
