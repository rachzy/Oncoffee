import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import ProductPopup from "./Popup/ProductPopup";

const Popup = ({ popupContent }) => {
  const popup = useRef(null);
  const popupBox = useRef(null);
  const navigate = useNavigate();

  //Close the popup Box
  const handleCloseIconClick = () => {
    //Trigger closing animation
    popupBox.current.classList.remove("active");
    setTimeout(() => {
      //Displays off the popup div
      popup.current.classList.remove("active");
      document.body.style.overflowY = "visible";
    }, 200);
  };

  if (popup.current) {
    //Close the popup if the user clicked outside of the "popup-box"
    popup.current.addEventListener("click", function (e) {
      e.preventDefault();
      const getPaths = e.path;
      let isClickInsidePopupBox = false;

      getPaths.map((path) => {
        //If the path class name is "popup-box active", the click was inside of the popup-box
        if (path.className === "popup-box active")
          return (isClickInsidePopupBox = true);
        return null;
      });

      if (isClickInsidePopupBox) return;
      handleCloseIconClick();
    });
  }

  //Wait until "PopupContent" state is loaded
  function renderElementsIfPopupContentIsNotNull() {
    //Render "BottomBtn" (checkout button) if necessary
    function renderBottomBtn() {
      if (!popupContent.button) return;
      const handleButtonClick = () => {
        //Get all the products in the popup-box
        const allPopupProductsIds = document.querySelectorAll(".popup-product");

        let getAllProductsIds;

        allPopupProductsIds.forEach((productDiv) => {
          if (!productDiv) return;

          //If the current "productDiv" display is "none", that means that the user removed it
          //By clicking in the X button. So, return
          if (productDiv.style.display === "none") return;

          if (getAllProductsIds) {
            getAllProductsIds = `${getAllProductsIds},${productDiv.id}`;
          } else {
            getAllProductsIds = `${productDiv.id}`;
          }
        });

        //Redirect the user to the checkout page with the products IDs passed in the URL
        navigate(`checkout/products=${getAllProductsIds}`);

        //Scroll the page to the top
        window.scrollTo(0, 0);

        //Close the popup
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

    //Return the class of "popup-box" div depending of the "Bottom Button" existence
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
                src={require(`../../imgs/${popupContent.product.productImgSrc}`)}
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
        <div
          id="popup-products-box"
          className={changePopupScrollBoxIfButtonExists()}
        >
          {popupContent.products.map((product) => {
            if (!product) return null;
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
