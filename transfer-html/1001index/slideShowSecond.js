const slider2 = document.querySelector(".slider2");
const nextBtn2 = document.querySelector(".next-btn2");
const prevBtn2 = document.querySelector(".prev-btn2");
const slides2 = document.querySelectorAll(".slide2");
const slideIcons2 = document.querySelectorAll(".slide-icon2");
const numberOfSlides2 = slides2.length;
var slideNumber2 = 0;

//image slider next button
nextBtn2.addEventListener("click", () => {
  slides2.forEach((slide2) => {
    slide2.classList.remove("active");
  });
  slideIcons2.forEach((slideIcon2) => {
    slideIcon2.classList.remove("active");
  });

  slideNumber2++;

  if(slideNumber2 > (numberOfSlides2 - 1)){
    slideNumber2 = 0;
  }

  slides2[slideNumber2].classList.add("active");
  slideIcons2[slideNumber2].classList.add("active");
});

//image slider previous button
prevBtn2.addEventListener("click", () => {
  slides2.forEach((slide) => {
    slide2.classList.remove("active");
  });
  slideIcons2.forEach((slideIcon2) => {
    slideIcon2.classList.remove("active");
  });

  slideNumber2--;

  if(slideNumber2 < 0){
    slideNumber2 = numberOfSlides2 - 1;
  }

  slides2[slideNumber2].classList.add("active");
  slideIcons2[slideNumber2].classList.add("active");
});

//image slider autoplay
var playSlider2;

var repeaterSlideShowTwo = () => {
  playSlider2 = setInterval(function(){
    slides2.forEach((slide2) => {
      slide2.classList.remove("active");
    });
    slideIcons2.forEach((slideIcon2) => {
      slideIcon2.classList.remove("active");
    });

    slideNumber2++;

    if(slideNumber2 > (numberOfSlides2 - 1)){
      slideNumber2 = 0;
    }

    slides2[slideNumber2].classList.add("active");
    slideIcons2[slideNumber2].classList.add("active");
  }, 4000);
}
repeaterSlideShowTwo();

//stop the image slider autoplay on mouseover
slider2.addEventListener("mouseover", () => {
  clearInterval(playSlider2);
});

//start the image slider autoplay again on mouseout
slider2.addEventListener("mouseout", () => {
  repeaterSlideShowTwo();
});