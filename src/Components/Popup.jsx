import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProductPopup from "./Popup/ProductPopup";

const Popup = ({ popupContent }) => {
  const popup = useRef(null);
  const popupBox = useRef(null);
  const navigate = useNavigate();

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
          const allPopupProductsIds = document.querySelectorAll(".popup-product");

          let getAllProductsIds;

          allPopupProductsIds.forEach(productDiv => {
            if(!productDiv) return;
            if(productDiv.style.display === "none") return;
            if(getAllProductsIds) {
              getAllProductsIds = `${getAllProductsIds},${productDiv.id}`;
            } else {
              getAllProductsIds = `${productDiv.id}`;
            }
          });

          navigate(`checkout/products=${getAllProductsIds}`);
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
    if (!popupContent) return;

    //(IGNORE, CURRENTLY UNUSED) Content that will be displayed if a single product will be displayed
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
        <div id="popup-products-box" className={changePopupScrollBoxIfButtonExists()}>
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
                closePopupBox={handleCloseIconClick}
                removeProduct={popupContent.removeProduct}
              />
            );
          })}
        </div>
        {renderBottomBtn()}
      </>
    );
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
