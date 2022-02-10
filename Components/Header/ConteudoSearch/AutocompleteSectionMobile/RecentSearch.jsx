import React from "react";    
import { useNavigate } from "react-router-dom";

const RecentSearch = ({ setInputValue, value, postInputSearchProductValue }) => {
  const navigate = useNavigate();
  const handleAutocompleteClick = () => {
    setInputValue({
      searchValue: value
    });
    navigate(`/search/${value}`);
    document.querySelector("#content-search").classList.remove("active");
    document.querySelector(".swichline").style.marginLeft = '3%'
    window.location.href = "#top";
    postInputSearchProductValue(value);
  }
  return (
    <li name="recent-search">
      <input id="recentsearch" type="button" style={{ display: "flex" }} />
      <label onClick={handleAutocompleteClick}>
        <div className="recentsearchbox1">
          <i className="fas fa-history"></i>
        </div>
        <div className="recentsearchbox2">
          <p>{value}</p>
        </div>
        <div className="recentsearchbox3">
          <i className="fas fa-search"></i>
        </div>
      </label>
    </li>
  );
};

export default RecentSearch;
