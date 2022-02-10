import React from 'react';

import AutocompleteValue from './AutocompleteValue';

const Autocomplete = ({autocompleteShow, setAutocompleteShow, setInputValue}) => {
    // const autocompleteValues = [
    //     {
    //         id: '1',
    //         value: 'Exemplo1'
    //     },
    //     {
    //         id: '2',
    //         value: 'Exemplo2'
    //     }
    // ];
    return (
        <div className="consult_autocomplete">
            <ul>
                {autocompleteShow.map(v => {
                    if(!v) return null;
                    if(v.value === "") return null;
                    return (
                        <AutocompleteValue key={`${v.searchId}${v.searchValue}`} id={v.searchId} value={v.searchValue} setInputValue={setInputValue} setAutocompleteShow={setAutocompleteShow} />
                    );
                })
                }
            </ul>
        </div>
    );
}

export default Autocomplete;