import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductPopup from "./Popup/ProductPopup";

const Popup = ({ popupContent }) => {
  const popup = useRef(null);
  const popupBox = useRef(null);
  const navigate = useNavigate();

  const [hrefButton, setHrefButton] = useState();

  const handleCloseIconClick = () => {
    popupBox.current.classList.remove("active");
    setTimeout(() => {
      popup.current.classList.remove("active");
      document.body.style.overflowY = "visible";
    }, 500);
  };

  if (popup.current) {
    popup.current.addEventListener("click", function (e) {
      const getPaths = e.path;
      let isClickInsidePopupBox = false;

      getPaths.map((path) => {
        if (path.className === "popup-box active")
          return (isClickInsidePopupBox = true);
      });
      if (isClickInsidePopupBox) return;
      handleCloseIconClick();
    });
  }

  function renderElementsIfPopupContentIsNotNull() {
    function renderBottomBtn() {
      if (popupContent.button) {
        const handleButtonClick = () => {
          if(hrefButton) {
            navigate(`${hrefButton.href}`);
          } else {
            navigate(`${popupContent.button.href}`);
          }
          window.scrollTo(0, 0);
          handleCloseIconClick();
        };
        return (
          <div className="popup-bottom-btn">
            <button className="default-btn" onClick={handleButtonClick}>
              {popupContent.button.title}
            </button>
          </div>
        );
      }
    }
    function changePopupScrollBoxIfButtonExists() {
      if (popupContent.button) {
        return "popup-scroll-box";
      }
      return "popup-scroll-box no-button";
    }
    if (popupContent) {
      if (popupContent.type === "singleproduct") {
        return (
          <>
            <h1>{popupContent.title}</h1>
            <div className={changePopupScrollBoxIfButtonExists()}>
              <div className="single-product-box">
                <img
                  src={require(`../imgs/${popupContent.product.productImgSrc}`)}
                  alt={popupContent.product.productImgAlt}
                />
                <div className="single-product-title">
                  <h2>R$ {popupContent.product.productFinalPrice}</h2>
                </div>
                <div className="single-product-about">
                  <p>{popupContent.product.productDescription}</p>
                </div>
              </div>
            </div>
            {renderBottomBtn()}
          </>
        );
      }
      return (
        <>
          <h1>{popupContent.title}</h1>
          <div className={changePopupScrollBoxIfButtonExists()}>
            {popupContent.products.map((product) => {
              if (!product) return;
              return (
                <ProductPopup
                  key={product.productId}
                  popupType={popupContent.type}
                  productId={product.productId}
                  productName={product.productName}
                  productDescription={product.productDescription}
                  productFinalPrice={product.productFinalPrice}
                  productImgSrc={product.productImgSrc}
                  productImgAlt={product.productImgAlt}
                  hrefButtonState={hrefButton}
                  setHrefButtonState={setHrefButton}
                  popupHref={popupContent.button.href}
                />
              );
            })}
          </div>
          {renderBottomBtn()}
        </>
      );
    }
  }
  return (
    <div ref={popup} className="popup">
      <div ref={popupBox} className="popup-box">
        <div className="popup-box-close-icon">
          <i onClick={handleCloseIconClick} className="fas fa-times"></i>
        </div>
        {renderElementsIfPopupContentIsNotNull()}
      </div>
    </div>
  );
};

export default Popup;
