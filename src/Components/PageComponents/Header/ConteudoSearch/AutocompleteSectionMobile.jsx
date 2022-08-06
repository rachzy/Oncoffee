import React from "react";

import RecentSearch from "./AutocompleteSectionMobile/RecentSearch";
import NormalSearch from "./AutocompleteSectionMobile/NormalSearch";

const AutocompleteSectionMobile = ({
  autocompleteShow,
  setInputValue,
  postInputSearchProductValue,
}) => {
  return (
    <div className="input-search-autocomplete">
      <ul>
        <div name="recent-search">
          {autocompleteShow.map((search) => {
            if (!search.searchValue) return null;
            if (search.notRecent) {
              return (
                <NormalSearch
                  key={search.searchId}
                  value={search.searchValue}
                  setInputValue={setInputValue}
                  postInputSearchProductValue={postInputSearchProductValue}
                />
              );
            }
            return (
              <RecentSearch
                key={search.searchId}
                value={search.searchValue}
                setInputValue={setInputValue}
                postInputSearchProductValue={postInputSearchProductValue}
              />
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default AutocompleteSectionMobile;
