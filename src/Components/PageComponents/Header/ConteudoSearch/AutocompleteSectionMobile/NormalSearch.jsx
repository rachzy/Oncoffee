import React from "react";
import { useNavigate } from "react-router-dom";

const NormalSearch = ({ setInputValue, value, postInputSearchProductValue }) => {
  const navigate = useNavigate();
  const handleAutocompleteClick = () => {
    setInputValue({
      searchValue: value
    });
    navigate(`/search/${value}`);
    document.querySelector("#content-search").classList.remove("active");
    document.querySelector(".swichline").style.marginLeft = '3%'
    window.scrollTo(0, 0);
    postInputSearchProductValue(value);
  }
  return (
    <li name="normal-search">
      <input id="normalsearch" type="button" style={{ display: "none" }} />
      <label onClick={handleAutocompleteClick}>
        <div className="recentsearchbox1">
          <i className="fas fa-search"></i>
        </div>
        <div className="recentsearchbox2">
          <p>{value}</p>
        </div>
        <div className="recentsearchbox3">
          <i className="fas fa-external-link-alt"></i>
        </div>
      </label>
    </li>
  );
};

export default NormalSearch;
