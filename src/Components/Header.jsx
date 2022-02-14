import React, { useState } from "react";

import Axios from 'axios';

import displayError from "../globalFunctions/displayErrors";

import Title from "./Header/Title";
import Logo from "./Header/Logo";
import MenuItem from "./Header/MenuItem";
import Product from "./Header/Product";

import onCoffee_logo from "../imgs/OnCoffee.png";
import newUser_logo from "../imgs/newuser.png";
import newHeart_logo from "../imgs/newhearth.png";
import cafeGourmet_logo from "../imgs/cafegourmet.png";
import newKart_logo from "../imgs/newkart.png";

import "../css/Header.css";
import ConteudoSearch from "./Header/ConteudoSearch";
import ButtonNavbar from "./Header/ButtonNavbar";
import FavoriteProducts from "./Header/FavoriteProducts";

const Header = ({ children, setFavoritedProducts, favoritedProductsState, handleSetPopupState }) => {
  const {serverUrl} = require('../connection.json');
  const setExampleCookie = async() => {
    const userId = 25022006;

    const { data } = await Axios.get(
      `${serverUrl}/getusersecuritytokens/${userId}`
    )
    if(data.isError) {
      displayError(data.errorCode, data.errno);
      return;
    }
    
    if(!data && data.length === 0) return;

    document.cookie = `STOKEN1 = ${data.accountSecurityToken1};secure`;
    document.cookie = `STOKEN2 = ${data.accountSecurityToken2};secure`;
    document.cookie = `UID = ${userId};secure`;
  };

  return (
    <header>
      <nav className="navbar3">
        <Title firstClass="pagname3" secondClass="hunderline3">
          {children}
        </Title>
        <Logo className="navlogo3" logo={onCoffee_logo} />
        <MenuItem icon={newUser_logo} alt="newuser-oncoffee-icon">
          <div className="user_box">
            <ul>
              <li>
                <ButtonNavbar
                  className="login"
                  onClick={setExampleCookie}
                >
                  Login
                </ButtonNavbar>
                <ButtonNavbar className="register" href="/">
                  Registro
                </ButtonNavbar>
              </li>
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
        <MenuItem id="favorited-products-icon" icon={newHeart_logo} alt="newhearth-oncoffee-icon">
          <FavoriteProducts handleSetPopupState={handleSetPopupState} setFavoritedProducts={setFavoritedProducts} favoritedProducts={favoritedProductsState} />
        </MenuItem>
        <MenuItem icon={newKart_logo} alt="newkart-oncoffee-icon">
          <div className="fav_quant">
            <p>0</p>
          </div>
          <div className="shop_box">
            <div className="shop_box_overflow">
              <Product productLogo={cafeGourmet_logo} />
            </div>
            <a href="/">Conferir Carrinho</a>
          </div>
        </MenuItem>
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
        />
        <MenuItem
          icon={newKart_logo}
          id="trigger-box-3"
          alt="newkart-oncoffee-icon"
        />
      </nav>
      <ConteudoSearch />
    </header>
  );
};

export default Header;
