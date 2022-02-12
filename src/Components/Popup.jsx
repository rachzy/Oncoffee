import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProductPopup from "./Header/Popup/ProductPopup";

const Popup = ({ popupContent }) => {
  const popup = useRef(null);
  const navigate = useNavigate();

  const handleIconClick = () => {
    popup.current.classList.remove("active");
    document.body.style.overflowY = "visible";
  };

  function renderElementsIfPopupContentIsNotNull() {
    function renderBottomBtn() {
      if (popupContent.button) {
        const handleButtonClick = () => {
          navigate(`${popupContent.button.href}`);
          handleIconClick();
        }
        return <button onClick={handleButtonClick}>{popupContent.button.title}</button>;
      }
    }
    function changePopupScrollBoxIfButtonExists() {
      if(popupContent.button) {
        return ("popup-scroll-box")
      }
      return("popup-scroll-box no-button")
    }
    if (popupContent) {
      return (
        <>
          <h1>{popupContent.title}</h1>
          <div className={changePopupScrollBoxIfButtonExists()}>
            {popupContent.products.map((product) => {
              if (!product) return;
              return (
                <ProductPopup
                  key={product.productId}
                  productId={product.productId}
                  productName={product.productName}
                  productFinalPrice={product.productFinalPrice}
                  productImgSrc={product.productImgSrc}
                  productImgAlt={product.productImgAlt}
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
      <div className="popup-box">
        <i onClick={handleIconClick} className="fas fa-times"></i>
        {renderElementsIfPopupContentIsNotNull()}
      </div>
    </div>
  );
};

export default Popup;
