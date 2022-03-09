import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import "../../css/Bottom.css";

import NewHomeIcon from '../../imgs/newhome.png';
import NewSearchIcon from '../../imgs/newsearch.png';
import NewUsericon from '../../imgs/newuser.png';

const Buttonsmo = () => {
    let conteudoSearch = document.querySelector("#content-search");

    const navigate = useNavigate();
    const swichline = useRef(null);

    const handleHomeButtonClick = () => {
        conteudoSearch.classList.remove("active");
        swichline.current.style.marginLeft = '3%';
    }

    const handleHomeButtonDoubleClick = () => {
        conteudoSearch.classList.remove("active");
        swichline.current.style.marginLeft = '3%';
        navigate('/');
    }

    const handleSearchButtonClick = () => {
        conteudoSearch = document.querySelector("#content-search");
        conteudoSearch.classList.add("active");
        swichline.current.style.marginLeft = '40%';
        window.scrollTo(0, 0);
    }

    const handleUserButtonClick = () => {
        conteudoSearch.classList.remove("active");
        swichline.current.style.marginLeft = '75%';
    }

    return (
        <main className="buttonsmo">
            <input type="checkbox" name="" id="searchcheck" />
            <main className="switcher">
                <div className="buttonsarea">
                    <label onClick={handleHomeButtonClick} onDoubleClick={handleHomeButtonDoubleClick} className="sbtt"><img src={NewHomeIcon} alt="new-home-icon" /></label>
                    <label onClick={handleSearchButtonClick} className="sbtt"><img src={NewSearchIcon} alt="new-search-icon" /></label>
                    <label onClick={handleUserButtonClick} className="sbtt" htmlFor="perfilbtt"><img src={NewUsericon} alt="new-user-icon" /></label>
                </div>
                <div className="linearea">
                    <div ref={swichline} className="swichline"></div>
                </div>
            </main>
        </main>
    );
}

export default Buttonsmo;