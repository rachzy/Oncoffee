import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/Header.css";
import "../../css/extra.css";
import "../../css/Top.css";

import Title from "./Header/Title";
import Logo from "./Header/Logo";
import MenuItem from "./Header/MenuItem";

import onCoffee_logo from "../../imgs/OnCoffee.png";
import newUser_logo from "../../imgs/newuser.png";
import newHeart_logo from "../../imgs/newhearth.png";
import newKart_logo from "../../imgs/newkart.png";

import ConteudoSearch from "./Header/ConteudoSearch";
import ButtonNavbar from "./Header/ButtonNavbar";
import FavoritedProducts from "./Header/MenuTabs/FavoritedProducts";
import ShoppingCartProducts from "./Header/MenuTabs/ShoppingCartProdcuts";
import NavRight from "./Header/NavRight";

import { GlobalServerContext } from "../../App";

const Header = ({
  children,
  favoritedProductsState,
  cartProductsState,
  handleSetPopupState,
  handleRemoveCartProduct,
  handleFavoritedProductsChange,
  serverStatus,
}) => {
  const { isLogged } = useContext(GlobalServerContext);
  const navigate = useNavigate();

  const handleMobileHeartIconClick = () => {
    const popup = document.querySelector(".popup");
    const popupBox = document.querySelector(".popup-box");
    popup.classList.add("active");
    popupBox.classList.add("active");
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    handleSetPopupState("favoritedproducts");
  };

  const handleMobileKartIconClick = () => {
    const popup = document.querySelector(".popup");
    const popupBox = document.querySelector(".popup-box");
    popup.classList.add("active");
    popupBox.classList.add("active");
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    handleSetPopupState("shoppingcart");
  };

  function renderFavoritedProductsIfServerStatusIs200() {
    if (serverStatus !== 200) return null;
    return (
      <FavoritedProducts
        handleSetPopupState={handleSetPopupState}
        favoritedProducts={favoritedProductsState}
        handleFavoritedProductsChange={handleFavoritedProductsChange}
      />
    );
  }

  const renderUserBoxContent = () => {
    if (isLogged) {
      return (
        <>
          <li>
            <ButtonNavbar className="lia" href="/">
              Minha Conta
            </ButtonNavbar>
          </li>
          <li>
            <ButtonNavbar className="lia" href="/">
              Meus Cupons
            </ButtonNavbar>
          </li>
        </>
      );
    }
    return (
      <li>
        <ButtonNavbar
          className="login"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </ButtonNavbar>
        <ButtonNavbar
          className="register"
          onClick={() => {
            navigate("/login?openRegister");
          }}
        >
          Registro
        </ButtonNavbar>
      </li>
    );
  };

  return (
    <header>
      <nav className="navbar3">
        <Title>{children}</Title>
        <Logo logo={onCoffee_logo} />

        <NavRight>
          <MenuItem icon={newUser_logo} alt="newuser-oncoffee-icon">
            <div className="user_box">
              <ul>
                {renderUserBoxContent()}
                <li>
                  <ButtonNavbar className="lia" href="/">
                    Sobre nós
                  </ButtonNavbar>
                </li>
                <li>
                  <ButtonNavbar className="lia" href="/">
                    Suporte
                  </ButtonNavbar>
                </li>
                <li>
                  <ButtonNavbar className="lia" href="/">
                    Vender aqui
                  </ButtonNavbar>
                </li>
              </ul>
            </div>
          </MenuItem>

          <MenuItem
            id="favorited-products-icon"
            icon={newHeart_logo}
            alt="newhearth-oncoffee-icon"
          >
            {renderFavoritedProductsIfServerStatusIs200()}
          </MenuItem>

          <MenuItem icon={newKart_logo} alt="newkart-oncoffee-icon">
            <ShoppingCartProducts
              handleSetPopupState={handleSetPopupState}
              cartProducts={cartProductsState}
              handleRemoveCartProduct={handleRemoveCartProduct}
            />
          </MenuItem>
        </NavRight>
      </nav>
      <nav id="#top" className="navbar2">
        <Title firstClass="pagname" secondClass="hunderline">
          {children}
        </Title>
        <Logo className="navlogo2" logo={onCoffee_logo} />
        <MenuItem
          icon={newHeart_logo}
          id="trigger-box-2"
          alt="newhearth-oncoffee-icon"
          onClick={handleMobileHeartIconClick}
        />
        <MenuItem
          icon={newKart_logo}
          id="trigger-box-3"
          alt="newkart-oncoffee-icon"
          onClick={handleMobileKartIconClick}
        />
      </nav>
      <ConteudoSearch />
    </header>
  );
};

export default Header;
