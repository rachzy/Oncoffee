import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({className, logo}) => {
    const handleLogoClick = () => {
        document.querySelector(".swichline").style.marginLeft = '3%'
        document.querySelector("#content-search").classList.remove("active");
    }
    return (
        <div className={className}>
            <Link onClick={handleLogoClick} to="/">
                <img src={logo} alt="oncoffee-banner" />
            </Link>
        </div>
    );
}
 
export default Logo;