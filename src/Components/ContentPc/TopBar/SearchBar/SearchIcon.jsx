import React from 'react';

import SearchIconImg from "../../../../imgs/newsearch.png";

const SearchIcon = ({onClick}) => {
    return (
        <label onClick={onClick} id="label-searchicon">
            <img src={SearchIconImg} alt="searchicon-oncoffee" />
        </label>
    );
}

export default SearchIcon;