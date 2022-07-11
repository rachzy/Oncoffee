import React from "react";

import AutocompleteValue from "./AutocompleteValue";

const Autocomplete = ({
  autocompleteShow,
  setAutocompleteShow,
  setInputValue,
}) => {
  return (
    <div className="consult_autocomplete">
      <ul>
        {autocompleteShow.map((v) => {
          if (!v || !v.searchValue) return null;
          console.log(v);
          return (
            <AutocompleteValue
              key={`${v.searchId}${v.searchValue}`}
              id={v.searchId}
              value={v.searchValue}
              setInputValue={setInputValue}
              setAutocompleteShow={setAutocompleteShow}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Autocomplete;
